import type { Dispatch, SetStateAction } from "react";
import { getCurrentDirectory } from "../utils/get-current-directory";
import { fileSystem } from "../data/fileSystem";
import { formatDirectoryEntry } from "../utils/format-directory-entry";
import { useThemeStore } from "../../../shared/hooks/useThemeStore";

const INTRO_MESSAGE =
	'Welcome to httpster.tech – your fresh stop for all things tech and innovation! Type "help" for available commands.';

export const executeCommand = (
	command: string,
	currentPath: string[],
	setCurrentPath: Dispatch<SetStateAction<string[]>>,
): { response: string; isUrl?: boolean; isHtml?: boolean } => {
	const { setMode } = useThemeStore();
	console.log("comand?", command);

	const args = command.trim().split(" ");
	console.log("tjena?", args);

	const cmd = args[0]?.toLowerCase() || "";
	console.log("cmd?", cmd);

	switch (cmd) {
		case "ls": {
			console.log("hallå?");
			const currentDir = getCurrentDirectory(currentPath);
			if (!currentDir) {
				return { response: "Directory not found" };
			}
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
				response: "Directory not found. Did you mean to run cat filename.txt?",
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
			return { response: INTRO_MESSAGE };

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
  
  - You can use tab to autocomplete
  `,
			};

		case "dark": {
			setMode("dark");
			return { response: "Dark mode on — much better" };
		}

		case "light": {
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
