import { forwardRef, useRef, useState } from "react";
import { Input } from "./input";
import { Commands } from "@/routes/__root";

export const TerminalInput = ({
	executeCommand,
	isDarkMode,
	commands,
}: {
	executeCommand: (input: string) => void;
	isDarkMode: boolean;
	commands: Commands;
}) => {
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			executeCommand(input);
			setInput(""); // Clear input after executing command
		} else if (e.key === "Tab") {
			e.preventDefault();
			completeCommand();
		}
	};

	const completeCommand = () => {
		const command = Object.keys(commands).find((cmd) =>
			cmd.startsWith(input.slice(1)),
		);
		if (command) {
			setInput(`${command}`);
		}
	};

	return (
		<div className="flex items-center p-1 text-sm flex-nowrap overflow-x-auto">
			<span className="mr-2 whitespace-nowrap text-xs">
				{"(base) httpster.tech@MacBook-Pro ~ %"}
			</span>
			<Input
				ref={inputRef}
				type="text"
				value={input}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				className={`bg-transparent border-none focus:outline-none focus:ring-0 flex-grow min-w-[200px] ${
					isDarkMode ? "text-white" : "text-black"
				}`}
				autoFocus
			/>
		</div>
	);
};
