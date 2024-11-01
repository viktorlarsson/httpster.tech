import type { FileSystem } from "../types/file-system";
import { fileSystem } from "../data/fileSystem";

type CurrentDirectype = {
	description?: string;
	children?: FileSystem;
};

export const getCurrentDirectory = (
	currentPath: string[],
): CurrentDirectype => {
	if (currentPath.length === 0) {
		return {
			description: "",
			children: fileSystem,
		};
	}

	const currentDirectoryType: CurrentDirectype = {};
	let current = fileSystem;

	for (const dir of currentPath) {
		if (current[dir] && current[dir].type === "directory") {
			currentDirectoryType.description = current[dir].description;
			currentDirectoryType.children = current[dir].children;
			current = current[dir].children || {};
		} else {
			return {};
		}
	}

	return currentDirectoryType;
};
