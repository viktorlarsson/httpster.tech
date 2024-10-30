import { getCurrentDirectory } from "./get-current-directory";

export const getCompletions = (
	input: string,
	currentPath: string[],
): string[] => {
	const currentDir = getCurrentDirectory(currentPath);
	if (!currentDir) return [];

	const [command = "", ...args] = input.trim().split(" ");
	const lastArg = args[args.length - 1] || "";

	// Only provide completions for cd and cat commands
	if (!["cd", "cat"].includes(command.toLowerCase())) {
		return [];
	}

	const entries = Object.entries(currentDir);
	const matchingEntries = entries
		.filter(([name]) => name.startsWith(lastArg))
		.map(([name, item]) => {
			// Add trailing slash for directories when completing 'cd' command
			if (command === "cd" && item.type === "directory") {
				return name + "/";
			}
			return name;
		});

	return matchingEntries;
};
