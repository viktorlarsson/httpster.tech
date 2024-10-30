import { FileSystem } from "../types/file-system";
import { fileSystem } from "../data/fileSystem";

export const getCurrentDirectory = (
	currentPath: string[],
): FileSystem | undefined => {
	let current = fileSystem;

	for (const dir of currentPath) {
		if (current[dir] && current[dir].type === "directory") {
			current = current[dir].children || {};
		} else {
			return undefined;
		}
	}

	return current;
};
