import { useState } from "react";
import { getCompletions } from "../utils/get-completions";

export const useTabCompletion = (
	currentInput: string,
	currentPath: string[],
) => {
	const [completions, setCompletions] = useState<string[]>([]);
	const [completionIndex, setCompletionIndex] = useState(-1);

	const handleTabCompletion = () => {
		const possibleCompletions = getCompletions(currentInput, currentPath);

		// If no completions available, reset and exit
		if (possibleCompletions.length === 0) {
			setCompletions([]);
			setCompletionIndex(-1);
			return;
		}

		// If first time hitting Tab, initialize completions and index
		if (completions.length === 0) {
			setCompletions(possibleCompletions);
			setCompletionIndex(0);
			updateCurrentInput(possibleCompletions[0]);
			return;
		}

		// Cycle through the list of completions
		const nextIndex = (completionIndex + 1) % completions.length;
		setCompletionIndex(nextIndex);
		updateCurrentInput(completions[nextIndex]);
	};

	const updateCurrentInput = (completion: string) => {
		// Split the input into command and arguments, replace last argument with completion
		const parts = currentInput.trim().split(" ");
		parts[parts.length - 1] = completion;
		setCurrentInput(parts.join(" "));
	};

	return { completions, completionIndex, handleTabCompletion };
};
