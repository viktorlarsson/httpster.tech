import { useState } from "react";

export const useTerminalHistory = () => {
	const [inputHistory, setInputHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);

	const addToHistory = (command: string) => {
		setInputHistory((prev) => [...prev, command]);
		setHistoryIndex(-1);
	};

	const navigateHistory = (
		direction: "up" | "down",
		currentInput: string,
		setCurrentInput: (value: string) => void,
	) => {
		if (inputHistory.length === 0) return; // Early exit if history is empty

		if (direction === "up" && historyIndex < inputHistory.length - 1) {
			const newIndex = historyIndex + 1;
			setHistoryIndex(newIndex);
			setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
		} else if (direction === "down") {
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex] || "");
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setCurrentInput("");
			}
		}
	};

	return { addToHistory, navigateHistory };
};
