import { describe, it, expect, vi } from "vitest";
import { getCurrentDirectory } from "../get-current-directory";

vi.mock("../../data/fileSystem", () => {
	return {
		fileSystem: {
			root: {
				type: "directory",
				children: {
					folder1: {
						type: "directory",
						children: {
							file1: { type: "file" },
							subfolder1: { type: "directory", children: {} },
						},
					},
					folder2: { type: "directory", children: {} },
					file2: { type: "file" },
				},
			},
		},
	};
});

describe("getCurrentDirectory", () => {
	it("returns the root directory when given an empty path", () => {
		const result = getCurrentDirectory([]);
		expect(result).toEqual({
			root: {
				type: "directory",
				children: {
					folder1: {
						type: "directory",
						children: {
							file1: { type: "file" },
							subfolder1: { type: "directory", children: {} },
						},
					},
					folder2: { type: "directory", children: {} },
					file2: { type: "file" },
				},
			},
		});
	});

	it("navigates to a specific folder within the root", () => {
		const result = getCurrentDirectory(["root", "folder1"]);
		expect(result).toEqual({
			file1: { type: "file" },
			subfolder1: { type: "directory", children: {} },
		});
	});

	it("returns undefined if the path contains a file instead of a directory", () => {
		const result = getCurrentDirectory(["root", "file2"]);
		expect(result).toBeUndefined();
	});

	it("returns undefined if the path does not exist", () => {
		const result = getCurrentDirectory(["root", "nonexistentFolder"]);
		expect(result).toBeUndefined();
	});

	it("returns the contents of a subfolder if navigated correctly", () => {
		const result = getCurrentDirectory(["root", "folder1", "subfolder1"]);
		expect(result).toEqual({});
	});
});
