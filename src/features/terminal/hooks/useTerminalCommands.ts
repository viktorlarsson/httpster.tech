import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { formatDirectoryEntry } from "../utils/format-directory-entry";
import { getCurrentDirectory } from "../utils/get-current-directory";
import type { CommandOutput } from "../types/command-output";
import { useThemeStore } from "@/shared/hooks/useThemeStore";
import useInitialDirectoryDescription from "./useInitialDirectoryDescription";

export const useTerminalCommands = (initialPath: string[]) => {
	const router = useRouter();
	const [currentPath, setCurrentPath] = useState<string[]>(initialPath);
	const [output, setOutput] = useState<CommandOutput[]>([]);

	const { setMode } = useThemeStore();
	useInitialDirectoryDescription(initialPath, setOutput);

	const executeCommand = (
		command: string,
	): { response: string; isUrl?: boolean; isHtml?: boolean } => {
		if (!command || typeof command !== "string") {
			return { response: "Invalid command input" };
		}

		const args = command.trim().split(" ");
		const cmd = args[0]?.toLowerCase() ?? "";

		switch (cmd) {
			case "ls": {
				const currentDir = getCurrentDirectory(currentPath);

				if (!currentDir || !currentDir.children)
					return { response: "Directory not found" };
				return {
					response: Object.entries(currentDir.children)
						.map(([name, item]) => formatDirectoryEntry(name, item.type))
						.join("  "),
					isHtml: true,
				};
			}

			case "cd": {
				const targetDir = args[1]?.replace(/\/+$/, "");
				if (targetDir === "..") {
					if (currentPath.length === 0) return { response: "Already at root" };
					const newPath = currentPath.slice(0, -1);
					router.navigate({ to: newPath.length ? `/${newPath[0]}` : "/" });
					setCurrentPath(newPath);
					return { response: "" };
				}

				if (!targetDir) {
					router.navigate({ to: "/" });
					setCurrentPath([]);
					return { response: "" };
				}

				const current = getCurrentDirectory(currentPath);
				if (
					current?.children &&
					current.children[targetDir]?.type === "directory"
				) {
					const newPath = [...currentPath, targetDir];
					router.navigate({ to: `/${targetDir}` });
					setCurrentPath(newPath);
					return { response: current.children[targetDir].description || "" };
				}

				return { response: "Directory not found" };
			}

			case "cat": {
				const fileName = args[1];
				const currentDir = getCurrentDirectory(currentPath);
				if (!currentDir || !currentDir.children)
					return { response: "Directory not found" };

				if (fileName && currentDir.children[fileName]?.type === "file") {
					return { response: currentDir.children[fileName].content || "" };
				}
				return { response: "File not found" };
			}

			case "open": {
				const fileName = args[1];
				const currentDir = getCurrentDirectory(currentPath);
				if (!currentDir || !currentDir.children)
					return { response: "Directory not found" };

				if (
					fileName &&
					currentDir.children[fileName]?.type === "file" &&
					currentDir.children[fileName].url
				) {
					window.open(currentDir.children[fileName].url, "_blank");
					return {
						response: `Opening ${currentDir.children[fileName].content}...`,
						isUrl: true,
					};
				}
				return { response: "No URL associated with this file" };
			}

			case "clear":
				setOutput([{ command: "", response: "", path: [] }]);
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
  light           Switch to light mode
  dark            Switch to dark mode
  
  - You can use tab to autocomplete`,
				};

			case "dark": {
				console.log("Dark mode command triggered");

				setMode("dark");
				return {
					response: "Dark mode on — much better",
				};
			}
			case "light": {
				console.log("Light command triggered");

				setMode("light");
				return {
					response: "Fine, light mode it is. Hope you brought sunglasses",
				};
			}

			default:
				return {
					response: `Command not found: ${cmd}. Type 'help' for available commands.`,
				};
		}
	};

	const handleCommand = (command: string) => {
		if (!command.trim()) return;

		const { response, isUrl, isHtml } = executeCommand(command);
		if (command.trim().toLowerCase() !== "clear") {
			setOutput((prev) => [
				...prev,
				{ command, response, path: [...currentPath], isUrl, isHtml },
			]);
		}
	};

	return {
		currentPath,
		output,
		setOutput,
		handleCommand,
	};
};
