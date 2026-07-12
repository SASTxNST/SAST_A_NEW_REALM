import { useState, useEffect, useRef } from "react";

const LINES = [
  { prefix: "> ", text: "SYSTEM STATUS: STANDBY" },
  { prefix: "> ", text: "Sorry the onboarding has not started yet, check in a few lightyears" },
];

const TYPING_SPEED = 55;   // ms per character
const LINE_PAUSE   = 480;  // ms pause between lines

export default function Join() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine]       = useState(0);
  const [currentChar, setCurrentChar]       = useState(0);
  const [done, setDone]                     = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setDone(true);
      return;
    }

    const line = LINES[currentLine];
    const full  = line.prefix + line.text;

    if (currentChar < full.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = full.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, TYPING_SPEED);
    } else {
      // Line complete — pause then move to next line
      timeoutRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentLine, currentChar]);

  return (
    <div className="join-terminal">
      {/* Scanline overlay */}
      <div className="terminal-scanlines" aria-hidden="true" />

      {/* Noise vignette */}
      <div className="terminal-vignette" aria-hidden="true" />

      <div className="terminal-body" role="main" aria-label="System Status Terminal">
        <div className="terminal-output">
          {displayedLines.map((line, i) => (
            <p key={i} className="terminal-line">
              {line}
              {/* Show cursor at end of currently-typing line */}
              {i === currentLine && !done && (
                <span className="terminal-cursor">█</span>
              )}
            </p>
          ))}

          {/* After all lines are typed, show cursor on its own line */}
          {done && (
            <p className="terminal-line terminal-line-cursor">
              <span className="terminal-cursor">█</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
