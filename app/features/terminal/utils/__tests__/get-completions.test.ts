import { describe, expect, it, vi } from "vitest";
import { getCompletions } from "../get-completions";
import { getCurrentDirectory } from "../get-current-directory";

vi.mock("../get-current-directory", () => ({
	getCurrentDirectory: vi.fn(),
}));

describe("getCompletions", () => {
	it("returns an empty array if current directory is not found", () => {
		(getCurrentDirectory as vi.Mock).mockReturnValue(null);
		const completions = getCompletions("cd", ["path", "to"]);
		expect(completions).toEqual([]);
	});

	it("returns an empty array for unsupported commands", () => {
		(getCurrentDirectory as vi.Mock).mockReturnValue({
			description: "Test directory",
			children: {
				file1: { type: "file" },
				folder: { type: "directory" },
			},
		});
		const completions = getCompletions("invalidCommand", ["path", "to"]);
		expect(completions).toEqual([]);
	});

	it("returns directory names with trailing slashes for 'cd' command", () => {
		(getCurrentDirectory as vi.Mock).mockReturnValue({
			description: "Test directory",
			children: {
				folder: { type: "directory" },
				file1: { type: "file" },
			},
		});
		const completions = getCompletions("cd fol", ["path", "to"]);
		expect(completions).toEqual(["folder/"]);
	});

	it("returns matching file names for 'cat' command", () => {
		(getCurrentDirectory as vi.Mock).mockReturnValue({
			description: "Test directory",
			children: {
				file1: { type: "file" },
				file2: { type: "file" },
				folder: { type: "directory" },
			},
		});
		const completions = getCompletions("cat file", ["path", "to"]);
		expect(completions).toEqual(["file1", "file2"]);
	});

	it("returns an empty array if no matching entries are found", () => {
		(getCurrentDirectory as vi.Mock).mockReturnValue({
			description: "Test directory",
			children: {
				file1: { type: "file" },
				folder: { type: "directory" },
			},
		});
		const completions = getCompletions("cd nonExistent", ["path", "to"]);
		expect(completions).toEqual([]);
	});
});
