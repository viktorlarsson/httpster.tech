import * as React from "react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useRef, useState } from "react";
import { useTerminalStore } from "@/hooks/useTerminalStore";
import { TerminalInput } from "@/components/ui/terminal-input";
import "unfonts.css";
import "../index.css";

export type Commands = Record<string, string>;

const COMMANDS: Commands = {
	help: "Display available commands",
	about: "Navigate to /about page",
	clear: "Clear the terminal",
	"cd ..": "Navigate one level up",
	light: "Switch to light mode",
	dark: "Switch to dark mode",
};

function RootComponent() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const navigate = useNavigate();
	const { addOutput, clearOutput, setLastCommand } = useTerminalStore();

	// Handle navigation to parent directory using "cd .."
	const navigateBackOneLevel = () => {
		const currentPath = location.pathname;
		if (currentPath === "/") {
			return; // If at root, don't navigate further back
		}
		// Remove the last segment of the path (after the last '/')
		const parentPath =
			currentPath.slice(0, currentPath.lastIndexOf("/")) || "/";
		navigate({ to: parentPath });
	};

	// This runs once when the component mounts
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// Handle the input command execution
	const handleCommand = (input: string) => {
		const trimmedInput = input.trim().toLowerCase();
		switch (trimmedInput) {
			case "help":
				setLastCommand("help"); // Store the last command

				addOutput([
					"Available commands: help, about, cd .., clear, light, dark",
				]);
				break;
			case "about":
				setLastCommand("about"); // Store the last command

				navigate({ to: "/about" }); // Navigate after output
				break;
			case "cd ..":
				setLastCommand("cd .."); // Store the last command

				addOutput(["Navigated one level back"]);
				navigateBackOneLevel();
				break;
			case "clear":
				setLastCommand("clear"); // Store the last command
				clearOutput(); // Clear both terminal and route content
				return;
			case "light":
				setLastCommand("light"); // Store the last command

				setIsDarkMode(false);
				addOutput(["Switched to light mode."]);
				break;
			case "dark":
				setLastCommand("dark"); // Store the last command

				setIsDarkMode(true);
				addOutput(["Dark mode on."]);
				break;
			default:
				addOutput([
					`Command not found: ${trimmedInput}. Type "help" for commands.`,
				]);
		}
	};

	return (
		<>
			<div
				className={`font-mono min-h-screen p-4 flex flex-col justify-between text-xs ${
					isDarkMode ? "bg-black text-white" : "bg-white text-black"
				}`}
			>
				<div className="flex-1 overflow-auto">
					<Outlet /> {/* This will render the route content */}
				</div>

				{/* Terminal input */}
				<TerminalInput
					executeCommand={handleCommand}
					isDarkMode={isDarkMode}
					commands={COMMANDS}
				/>
			</div>
		</>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
