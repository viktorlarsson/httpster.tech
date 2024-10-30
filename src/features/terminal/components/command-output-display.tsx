import { TerminalPrompt } from "./terminal-prompt";
import type { CommandOutput } from "../types/command-output";

interface CommandOutputDisplayProps {
	output: CommandOutput[];
}

export const CommandOutputDisplay: React.FC<CommandOutputDisplayProps> = ({
	output,
}) => {
	return (
		<div>
			{output.map((entry) => (
				<div key={entry.command} className="mb-2">
					{entry.command && !entry.isIntro && (
						<div className="flex gap-2">
							<TerminalPrompt currentPath={entry.path} />
							<span>{entry.command}</span>
						</div>
					)}
					{entry.response && (
						<div
							className={`whitespace-pre-wrap ${entry.isUrl ? "text-blue-400" : "opacity-90"}`}
							{...(entry.isHtml
								? { dangerouslySetInnerHTML: { __html: entry.response } }
								: { children: entry.response })}
						/>
					)}
				</div>
			))}
		</div>
	);
};
