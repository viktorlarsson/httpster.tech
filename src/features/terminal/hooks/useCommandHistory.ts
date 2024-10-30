import { useState } from "react";

export const useCommandHistory = () => {
	const [inputHistory, setInputHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [currentInput, setCurrentInput] = useState("");

	const addHistory = (command: string) => {
		setInputHistory((prev) => [...prev, command]);
		setHistoryIndex(-1);
		setCurrentInput("");
	};

	const navigateHistory = (direction: "up" | "down") => {
		if (direction === "up") {
			// Go back in history if not already at the earliest command
			if (historyIndex < inputHistory.length - 1) {
				const newIndex = historyIndex + 1;
				setHistoryIndex(newIndex);
				setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
			}
		} else if (direction === "down") {
			// Move forward in history if not at the latest input or reset if at the end
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
			} else if (historyIndex === 0) {
				// Clear the current input if at the most recent command
				setHistoryIndex(-1);
				setCurrentInput("");
			}
		}
	};

	return {
		currentInput,
		setCurrentInput,
		inputHistory,
		addHistory,
		navigateHistory,
	};
};
