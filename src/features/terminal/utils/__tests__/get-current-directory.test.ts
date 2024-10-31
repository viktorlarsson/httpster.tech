import { describe, it, expect, vi } from "vitest";
import { getCurrentDirectory } from "../get-current-directory";

vi.mock("../../data/fileSystem", () => {
	return {
		fileSystem: {
			root: {
				type: "directory",
				description: "Root directory",
				children: {
					folder1: {
						type: "directory",
						description: "Folder 1",
						children: {
							file1: { type: "file", description: "File 1" },
							subfolder1: {
								type: "directory",
								description: "Subfolder 1",
								children: {},
							},
						},
					},
					folder2: { type: "directory", description: "Folder 2", children: {} },
					file2: { type: "file", description: "File 2" },
				},
			},
		},
	};
});

describe("getCurrentDirectory", () => {
	it("returns the root directory when given an empty path", () => {
		const result = getCurrentDirectory([]);
		expect(result).toEqual({
			description: "",
			children: {
				root: {
					type: "directory",
					description: "Root directory",
					children: {
						folder1: {
							type: "directory",
							description: "Folder 1",
							children: {
								file1: { type: "file", description: "File 1" },
								subfolder1: {
									type: "directory",
									description: "Subfolder 1",
									children: {},
								},
							},
						},
						folder2: {
							type: "directory",
							description: "Folder 2",
							children: {},
						},
						file2: { type: "file", description: "File 2" },
					},
				},
			},
		});
	});

	it("navigates to a specific folder within the root", () => {
		const result = getCurrentDirectory(["root", "folder1"]);
		expect(result).toEqual({
			description: "Folder 1",
			children: {
				file1: { type: "file", description: "File 1" },
				subfolder1: {
					type: "directory",
					description: "Subfolder 1",
					children: {},
				},
			},
		});
	});

	it("returns undefined if the path contains a file instead of a directory", () => {
		const result = getCurrentDirectory(["root", "file2"]);
		expect(result).toEqual({});
	});

	it("returns undefined if the path does not exist", () => {
		const result = getCurrentDirectory(["root", "nonexistentFolder"]);
		expect(result).toEqual({});
	});

	it("returns the contents of a subfolder if navigated correctly", () => {
		const result = getCurrentDirectory(["root", "folder1", "subfolder1"]);
		expect(result).toEqual({
			description: "Subfolder 1",
			children: {},
		});
	});
});
