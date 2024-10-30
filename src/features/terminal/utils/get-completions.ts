import { getCurrentDirectory } from "./get-current-directory";

export const getCompletions = (
	input: string,
	currentPath: string[],
): string[] => {
	const currentDir = getCurrentDirectory(currentPath);
	if (!currentDir) return [];

	const [command = "", ...args] = input.trim().split(" ");
	const lastArg = args[args.length - 1] || "";

	if (!["cd", "cat", "open"].includes(command.toLowerCase())) {
		return [];
	}

	const entries = Object.entries(currentDir);
	const matchingEntries = entries
		.filter(([name]) => name.startsWith(lastArg))
		.map(([name, item]) => {
			if (command === "cd" && item.type === "directory") {
				return `${name}/`;
			}
			if (
				command === "open" &&
				(item.type === "file" || item.type === "directory")
			) {
				return name;
			}
			if (command === "cat" && item.type === "file") {
				return name;
			}
			return null;
		})
		.filter((entry): entry is string => entry !== null);

	return matchingEntries;
};
