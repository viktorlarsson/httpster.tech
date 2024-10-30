import { describe, it, expect } from "vitest";
import { formatDirectoryEntry } from "../format-directory-entry";

describe("formatDirectoryEntry", () => {
	it("formats a directory entry with a trailing slash and bold font", () => {
		const result = formatDirectoryEntry("myFolder", "directory");
		expect(result).toBe('<span class="font-semibold">myFolder/</span>');
	});

	it("formats a file entry with lower opacity", () => {
		const result = formatDirectoryEntry("myFile.txt", "file");
		expect(result).toBe('<span class="opacity-90">myFile.txt</span>');
	});
});
