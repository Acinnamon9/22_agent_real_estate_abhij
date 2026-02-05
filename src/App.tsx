import React, { useEffect, useRef, useState } from "react";
import { InfiniteCardScroll } from "./components/InfiniteCardScroll/InfiniteCardScroll";
import { mockCards } from "./data/mockCards";
import { Room, RoomEvent, Track, RemoteTrack, RemoteTrackPublication, RemoteParticipant } from "livekit-client";
import axios from "axios";
import { CardGrid } from "./components/InfiniteCardScroll/CardGrid";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [loadingAgentCode, setLoadingAgentCode] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string | null>("disconnected");
  // console.log("sessionStatus", sessionStatus);
  const [callSessionId, setCallSessionId] = useState<string | null>(null);
  const [stopScrolls, setStopScrolls] = useState(false);
  const [showRealEstateAgentVoice, setShowRealEstateAgentVoice] = useState(false);

  const roomRef = useRef<Room | null>(null);

  useEffect(() => {
    // Initialize LiveKit Room
    roomRef.current = new Room({
      adaptiveStream: true,
      dynacast: true,
    });

    const room = roomRef.current;

    const handleConnected = () => {
      console.log("Room connected");
      setSessionStatus("connected");
      setIsListening(true);
      setLoadingAgentCode(null);
    };

    const handleDisconnected = () => {
      console.log("Room disconnected");
      setSessionStatus("disconnected");
      setIsListening(false);
      setShowRealEstateAgentVoice(false);
      setStopScrolls(false);
      setLoadingAgentCode(null);
    };

    const handleReconnecting = () => {
      setSessionStatus("reconnecting");
    };

    const handleReconnected = () => {
      setSessionStatus("connected");
      setLoadingAgentCode(null);
    };

    const handleTrackSubscribed = (
      track: RemoteTrack,
      publication: RemoteTrackPublication,
      participant: RemoteParticipant
    ) => {
      if (track.kind === Track.Kind.Audio) {
        // Attach the audio track to the DOM to play it
        const element = track.attach();
        document.body.appendChild(element);
      }
    };

    // Optional: Handle track unsubscription to clean up elements? 
    // LiveKit detach() usually handles removal if we called attach().
    // We can listen to TrackUnsubscribed if we want manual cleanup logic, 
    // but track.attach() returns an element we usually just append.
    // LiveKit docs say: "When the track is unsubscribed, the element is automatically removed." 
    // (Actually, checking docs: track.detach() removes it. We should probably handle clean up.)

    room.on(RoomEvent.Connected, handleConnected);
    room.on(RoomEvent.Disconnected, handleDisconnected);
    room.on(RoomEvent.Reconnecting, handleReconnecting);
    room.on(RoomEvent.Reconnected, handleReconnected);
    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);

    return () => {
      // Cleanup
      room.disconnect();
      room.off(RoomEvent.Connected, handleConnected);
      room.off(RoomEvent.Disconnected, handleDisconnected);
      room.off(RoomEvent.Reconnecting, handleReconnecting);
      room.off(RoomEvent.Reconnected, handleReconnected);
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    };
  }, []);

  const handleStart = async (agent_code: string) => {
    if (sessionStatus === "connected" || sessionStatus === "connecting") {
      await handleEnd();
    }

    setLoadingAgentCode(agent_code);

    try {
      if (!roomRef.current) {
        setLoadingAgentCode(null);
        return;
      }

      const response = await axios.post(
        `https://app.snowie.ai/api/create-room/`,
        {
          agent_code: agent_code,
          provider: "thunderemotionlite",
          schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
        }
      );

      setStopScrolls(true);
      setShowRealEstateAgentVoice(true);

      const apiResponse = response.data;
      console.log("Raw API Response:", apiResponse);

      // Merge top-level and nested response data to handle variations
      // This ensures we get fields if they are at the top level OR inside 'response'
      const data = { ...apiResponse, ...(apiResponse.response || {}) };
      console.log("Merged parsed data:", data);

      const { callId, call_session_id, token, url, serverUrl } = data;

      const wsUrl = url || serverUrl;
      console.log("Extracted Token:", token ? "(present)" : "(missing)");
      console.log("Extracted URL:", wsUrl);

      if (callId) setCallId(callId);
      if (call_session_id) setCallSessionId(call_session_id);

      if (wsUrl && token) {
        console.log("Connecting to LiveKit Room...", wsUrl);
        await roomRef.current.connect(wsUrl, token);
        console.log("Connected! Enabling microphone...");
        await roomRef.current.localParticipant.setMicrophoneEnabled(true);
      } else {
        console.error("Token or WebSocket URL is missing in API response", response.data);
        setShowRealEstateAgentVoice(false);
        setStopScrolls(false);
        setLoadingAgentCode(null);
      }

    } catch (error) {
      console.error("Error in handleStart:", error);
      setShowRealEstateAgentVoice(false);
      setStopScrolls(false);
      setLoadingAgentCode(null);
    }
  };

  const handleEnd = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
    }

    // The disconnect event handler will reset state, 
    // but we can also forcefully ensure it here if needed.
    // We already moved state reset to 'handleDisconnected' to be safe.

    // If we need to notify backend about end of call session manually:
    if (callSessionId && callId) {
      try {
        await axios.post(
          `https://app.snowie.ai/api/end-call-session-thunder/`,
          {
            call_session_id: callSessionId,
            call_id: callId,
            schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
          }
        );
      } catch (e) {
        console.warn("Failed to report call end to backend", e);
      }
    }
  };

  return (
    <div className="max-w-10xl mx-auto">
      <CardGrid
        cards={mockCards}
        handleStart={handleStart}
        handleEnd={handleEnd}
        showRealEstateAgentVoice={showRealEstateAgentVoice}
        sessionStatus={sessionStatus}
        loadingAgentCode={loadingAgentCode}
      />
    </div>
  );
}

export default App;