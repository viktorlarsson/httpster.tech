import { useState } from "react";
import { getCompletions } from "../utils/get-completions";

export const useTerminalCompletion = () => {
	const [completions, setCompletions] = useState<string[]>([]);
	const [completionIndex, setCompletionIndex] = useState(-1);

	const handleTabCompletion = (
		currentInput: string,
		currentPath: string[],
		setCurrentInput: (value: string) => void,
	) => {
		const possibleCompletions = getCompletions(currentInput, currentPath);

		if (possibleCompletions.length === 0) {
			setCompletions([]);
			setCompletionIndex(-1);
			return;
		}

		if (completions.length === 0) {
			setCompletions(possibleCompletions);
			setCompletionIndex(0);
			const [command, ...args] = currentInput.trim().split(" ");
			args.pop();
			setCurrentInput([command, ...args, possibleCompletions[0]].join(" "));
		} else {
			const nextIndex = (completionIndex + 1) % completions.length;
			setCompletionIndex(nextIndex);
			const [command, ...args] = currentInput.trim().split(" ");
			args.pop();
			setCurrentInput([command, ...args, completions[nextIndex]].join(" "));
		}
	};

	const resetCompletions = () => {
		setCompletions([]);
		setCompletionIndex(-1);
	};

	return {
		completions,
		completionIndex,
		handleTabCompletion,
		resetCompletions,
	};
};
