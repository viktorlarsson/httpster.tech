import { useState, useRef, useEffect } from "react";
import { useTerminalCommands } from "../hooks/useTerminalCommands";
import { useTerminalCompletion } from "../hooks/useTerminalCompletions";
import { useTerminalHistory } from "../hooks/useTerminalHistory";
import { TerminalInput } from "./terminal-input";
import { TerminalOutput } from "./terminal-output";

interface TerminalProps {
  initialPath: string[];
}

export const Terminal = ({ initialPath }: TerminalProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { addToHistory, navigateHistory } = useTerminalHistory();
  const {
    completions,
    completionIndex,
    handleTabCompletion,
    resetCompletions,
  } = useTerminalCompletion();
  const { currentPath, output, handleCommand } =
    useTerminalCommands(initialPath);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion(currentInput, currentPath, setCurrentInput);
    } else if (e.key === "Enter") {
      handleCommand(currentInput);
      addToHistory(currentInput);
      setCurrentInput("");
      resetCompletions();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateHistory("up", currentInput, setCurrentInput);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateHistory("down", currentInput, setCurrentInput);
    } else {
      resetCompletions();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const terminalElement = terminalRef.current;
    if (
      terminalElement &&
      terminalElement.scrollHeight > terminalElement.clientHeight
    ) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  }, []);

  return (
    <div
      className="flex flex-col mx-auto pb-4"
      onClick={() => inputRef.current?.focus()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
    >
      <div ref={terminalRef} className="">
        <TerminalOutput output={output} />
        <TerminalInput
          currentPath={currentPath}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        {completions.length > 1 && (
          <div className="mt-2">
            {completions.map((completion, index) => (
              <span
                key={completion}
                className={`mr-4 ${index === completionIndex ? "underline" : ""}`}
              >
                {completion}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
