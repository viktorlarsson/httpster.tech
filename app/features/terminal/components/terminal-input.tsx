import { TerminalPrompt } from "./terminal-prompt";

interface TerminalInputProps {
	currentPath: string[];
	currentInput: string;
	setCurrentInput: (value: string) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	inputRef: React.RefObject<HTMLInputElement>;
}

export const TerminalInput = ({
	currentPath,
	currentInput,
	setCurrentInput,
	onKeyDown,
	inputRef,
}: TerminalInputProps) => {
	return (
		<div className="flex gap-3">
			<TerminalPrompt currentPath={currentPath} />
			<input
				ref={inputRef}
				type="text"
				value={currentInput}
				onChange={(e) => setCurrentInput(e.target.value)}
				onKeyDown={onKeyDown}
				className="flex-1 bg-transparent outline-none caret-green-400"
				spellCheck={false}
				autoComplete="off"
			/>
		</div>
	);
};
