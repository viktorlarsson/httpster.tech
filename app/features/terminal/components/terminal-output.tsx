import type { CommandOutput } from "../types/command-output";
import { TerminalPrompt } from "./terminal-prompt";

interface TerminalOutputProps {
  output: CommandOutput[];
}

export function TerminalOutput({ output }: TerminalOutputProps) {
  return (
    <>
      {output.map((entry, i) => (
        <div
          key={`${entry.command}_${i}`}
          className={`${entry.command || entry.response ? "mb-1" : ""}`}
        >
          {entry.command && !entry.isIntro && (
            <div className="flex gap-2">
              <TerminalPrompt currentPath={entry.path} />
              <span>{entry.command}</span>
            </div>
          )}
          <div
            className={`mt-1 whitespace-pre-wrap ${entry.isUrl ? "flex items-center gap-2" : ""} ${
              !entry.response ? "hidden" : ""
            }`}
            {...(entry.isHtml
              ? { dangerouslySetInnerHTML: { __html: entry.response } }
              : { children: entry.response })}
          />
        </div>
      ))}
    </>
  );
}
