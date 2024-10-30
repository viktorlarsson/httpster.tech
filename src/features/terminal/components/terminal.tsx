import { useState, useRef, useEffect } from "react";
import { useCommandHistory } from "../hooks/useCommandHistory";
import { TerminalPrompt } from "./terminal-prompt";
import { executeCommand } from "../utils/execute-command";
import { CommandOutputDisplay } from "./command-output-display";
import { useTabCompletion } from "../hooks/useTabCompletion";
import type { CommandOutput } from "../types/command-output";

export const Terminal = () => {
	const { currentInput, setCurrentInput, addHistory, navigateHistory } =
		useCommandHistory();
	const [currentPath, setCurrentPath] = useState<string[]>([]); // Add currentPath state
	const { handleTabCompletion } = useTabCompletion(currentInput, currentPath);
	const [output, setOutput] = useState<CommandOutput[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCommand = (command: string) => {
		const { response, isUrl, isHtml } = executeCommand(
			command,
			currentPath,
			setCurrentPath,
		);
		console.log("Updated currentPath:", currentPath); // Check if currentPath changes as expected
		setOutput((prev) => [
			...prev,
			{ command, response, path: [...currentPath], isUrl, isHtml },
		]);
		addHistory(command);
		setCurrentInput("");
	};
	useEffect(() => {
		console.log("currentPath updated:", currentPath); // Logs after currentPath is updated
	}, [currentPath]);
	const handleKeyDown = (e: React.KeyboardEvent) => {
		console.log("Key pressed:", e.key); // Log the key to confirm it's triggering
		if (e.key === "Tab") {
			e.preventDefault();
			handleTabCompletion();
		} else if (e.key === "Enter") {
			console.log("Enter key detected"); // Check if Enter key is recognized
			handleCommand(currentInput);
		} else if (e.key === "ArrowUp") {
			navigateHistory("up");
		} else if (e.key === "ArrowDown") {
			navigateHistory("down");
		}
	};

	return (
		<div onClick={() => inputRef.current?.focus()}>
			<div className="flex-grow overflow-y-auto">
				<CommandOutputDisplay output={output} />
				<div className="flex gap-2">
					<TerminalPrompt currentPath={currentPath} />
					<input
						ref={inputRef}
						type="text"
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
						onKeyDown={handleKeyDown} // Ensure this is here
						className="flex-1 bg-transparent outline-none caret-white"
						spellCheck={false}
						autoComplete="off"
					/>
				</div>
			</div>
		</div>
	);
};
