import { getCurrentDirectory } from "./get-current-directory";

export const getCompletions = (
	input: string,
	currentPath: string[],
): string[] => {
	const currentDir = getCurrentDirectory(currentPath);
	if (!currentDir) return [];

	const [command = "", ...args] = input.trim().split(" ");
	const lastArg = args[args.length - 1] || "";

	if (!["cd", "cat"].includes(command.toLowerCase())) {
		return [];
	}

	const entries = Object.entries(currentDir);
	const matchingEntries = entries
		.filter(([name]) => name.startsWith(lastArg))
		.map(([name, item]) => {
			if (command === "cd" && item.type === "directory") {
				return `${name}/`;
			}
			return name;
		});

	return matchingEntries;
};
