import { useState, useRef, useEffect } from "react";

import { TerminalPrompt } from "./terminal-prompt";
import { getCurrentDirectory } from "../utils/get-current-directory";
import { fileSystem } from "../data/fileSystem";
import { getCompletions } from "../utils/get-completions";
import type { CommandOutput } from "../types/command-output";
import { formatDirectoryEntry } from "../utils/format-directory-entry";

const INTRO_MESSAGE =
	'Welcome to httpster.tech – your fresh stop for all things tech and innovation! Type "help" for available commands.';

export const Terminal = () => {
	const [currentPath, setCurrentPath] = useState<string[]>([]);
	const [inputHistory, setInputHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [currentInput, setCurrentInput] = useState("");
	const [completions, setCompletions] = useState<string[]>([]);
	const [completionIndex, setCompletionIndex] = useState(-1);
	const [output, setOutput] = useState<CommandOutput[]>([
		{ command: "", response: INTRO_MESSAGE, path: [], isIntro: true },
	]);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	const executeCommand = (
		command: string,
	): { response: string; isUrl?: boolean; isHtml?: boolean } => {
		const args = command.trim().split(" ");
		const cmd = args[0]?.toLowerCase() || "";

		switch (cmd) {
			case "ls": {
				const currentDir = getCurrentDirectory(currentPath);
				if (!currentDir)
					return {
						response: "Directory not found",
					};
				return {
					response: Object.entries(currentDir)
						.map(([name, item]) => formatDirectoryEntry(name, item.type))
						.join("  "),
					isHtml: true,
				};
			}

			case "cd": {
				const targetDir = args[1]?.replace(/\/$/, ""); // Remove trailing slash if present
				if (targetDir === "..") {
					if (currentPath.length === 0) return { response: "Already at root" };
					setCurrentPath((prev) => prev.slice(0, -1));
					return { response: "" };
				}

				if (!targetDir) {
					setCurrentPath([]);
					return { response: "" };
				}

				let current = fileSystem;
				if (currentPath.length > 0) {
					current = getCurrentDirectory(currentPath) || {};
				}

				if (current[targetDir]?.type === "directory") {
					setCurrentPath((prev) => [...prev, targetDir]);
					return { response: current[targetDir].description || "" };
				}
				return {
					response:
						"Directory not found. Did you mean to run cat filename.txt?",
				};
			}

			case "cat": {
				const fileName = args[1];
				const currentDir = getCurrentDirectory(currentPath);

				if (!currentDir) return { response: "Directory not found" };

				if (fileName && currentDir[fileName]?.type === "file") {
					return { response: currentDir[fileName].content || "" };
				}
				return {
					response: fileName ? "File not found" : "Please specify a file name",
				};
			}

			case "open": {
				const fileName = args[1];
				const currentDir = getCurrentDirectory(currentPath);

				if (!currentDir) return { response: "Directory not found" };

				if (
					fileName &&
					currentDir[fileName]?.type === "file" &&
					currentDir[fileName].url
				) {
					window.open(currentDir[fileName].url, "_blank");
					return {
						response: `Opening ${currentDir[fileName].content}...`,
						isUrl: true,
					};
				}
				return {
					response: fileName
						? "No URL associated with this file"
						: "Please specify a file name",
				};
			}

			case "clear":
				setOutput([
					{ command: "", response: INTRO_MESSAGE, path: [], isIntro: true },
				]);
				setInputHistory([]); // Clear input history
				setHistoryIndex(-1);
				setCurrentInput("");
				return { response: "" };

			case "help":
				return {
					response: `Available commands:
  ls              List directory contents
  cd <dir>        Change directory (cd .. to go back)
  cat <file>      Display file contents
  open <file.link>     Open URL associated with file.link
  clear           Clear the terminal
  help            Show this help message
  
  - You can use tab to autocomplete
  `,
				};

			default:
				return {
					response: `Command not found: ${cmd}. Type 'help' for available commands.`,
				};
		}
	};

	const handleCommand = (command: string) => {
		if (!command.trim()) return;

		if (command.trim().toLowerCase() === "clear") {
			setOutput([
				{ command: "", response: INTRO_MESSAGE, path: [], isIntro: true },
			]);
			setInputHistory([]);
			setHistoryIndex(-1);
			setCurrentInput("");
			setCompletions([]);
			setCompletionIndex(-1);
			return;
		}

		const { response, isUrl, isHtml } = executeCommand(command);

		setOutput((prev) => [
			...prev,
			{
				command,
				response,
				path:
					command === "cd .."
						? (prev[prev.length - 1]?.path ?? [])
						: [...currentPath],
				isUrl,
				isHtml,
			},
		]);

		setInputHistory((prev) => [...prev, command]);
		setHistoryIndex(-1);
		setCurrentInput("");
		setCompletions([]);
		setCompletionIndex(-1);
	};

	const handleTabCompletion = () => {
		const possibleCompletions = getCompletions(currentInput, currentPath);

		if (possibleCompletions.length === 0) {
			return;
		}

		if (completions.length === 0) {
			setCompletions(possibleCompletions);
			if (possibleCompletions.length === 1) {
				const [command, ...args] = currentInput.trim().split(" ");
				args.pop();
				setCurrentInput([command, ...args, possibleCompletions[0]].join(" "));
			}
			setCompletionIndex(0);
		} else {
			const nextIndex = (completionIndex + 1) % completions.length;
			const [command, ...args] = currentInput.trim().split(" ");
			args.pop();
			setCurrentInput([command, ...args, completions[nextIndex]].join(" "));
			setCompletionIndex(nextIndex);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Tab") {
			e.preventDefault();
			handleTabCompletion();
		} else if (e.key === "Enter") {
			handleCommand(currentInput);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (historyIndex < inputHistory.length - 1) {
				const newIndex = historyIndex + 1;
				setHistoryIndex(newIndex);
				setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setCurrentInput("");
			}
		} else {
			setCompletions([]);
			setCompletionIndex(-1);
		}
	};
	useEffect(() => {
		if (output && terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [output]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div
			className="flex flex-col h-[100vh] mx-auto pb-4"
			onClick={() => inputRef.current?.focus()}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					inputRef.current?.focus();
				}
			}}
		>
			{" "}
			<div ref={terminalRef} className="flex-grow overflow-y-auto">
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
								className={`whitespace-pre-wrap ${
									entry.isUrl ? "text-blue-400" : "opacity-90"
								}`}
								{...(entry.isHtml
									? { dangerouslySetInnerHTML: { __html: entry.response } }
									: { children: entry.response })}
							/>
						)}
					</div>
				))}

				<div className="flex gap-2">
					<TerminalPrompt currentPath={currentPath} />
					<input
						ref={inputRef}
						type="text"
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-1 bg-transparent outline-none caret-white"
						spellCheck={false}
						autoComplete="off"
					/>
				</div>
				{completions.length > 1 && (
					<div className="mt-2 opacity-75">
						{completions.map((completion, index) => (
							<span
								key={completion}
								className={`mr-4 ${index === completionIndex ? "opacity-100 underline" : "opacity-75"}`}
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
