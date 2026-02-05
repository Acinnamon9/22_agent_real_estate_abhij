import React, { useEffect, useRef, useState } from "react";
import { X, Phone, Mic } from "lucide-react";
import AudioWaveform from "./AudioWaveform";
import "./RealEstateAgentVoice.css";

interface RealEstateAgentVoiceProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
  sessionStatus?: string | undefined | null;
  agentName?: string | undefined | null;
  anchorElement?: HTMLElement | null;
}

const RealEstateAgentVoice: React.FC<RealEstateAgentVoiceProps> = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose,
  sessionStatus,
  agentName,
  anchorElement,
}) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatDuration = (s: number): string => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (agentName) {
      setSeconds(0);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [agentName]);

  const handleClose = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose?.();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="voice-backdrop" onClick={handleClose} />
      
      {/* Floating Voice Bar */}
      <div className="voice-bar-container">
        <div className="voice-bar">
          {/* Pulse Ring */}
          <div className="voice-pulse-container">
            <div className="voice-pulse-ring"></div>
            <div className="voice-pulse-ring delay-1"></div>
            <div className="voice-icon-circle">
              <Phone size={18} />
            </div>
          </div>

          {/* Waveform */}
          <div className="voice-waveform">
            <AudioWaveform />
          </div>

          {/* Agent Info */}
          <div className="voice-info">
            <span className="voice-agent-name">{agentName || "AI Agent"}</span>
            <span className="voice-status">
              <span className="voice-status-dot"></span>
              Live Call
            </span>
          </div>

          {/* Timer */}
          <div className="voice-timer">
            <span className="voice-timer-value">{formatDuration(seconds)}</span>
          </div>

          {/* End Call Button */}
          <button className="voice-end-button" onClick={handleClose} aria-label="End Call">
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default RealEstateAgentVoice;