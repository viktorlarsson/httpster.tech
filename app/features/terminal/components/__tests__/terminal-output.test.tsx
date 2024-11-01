import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { CommandOutput } from "../../types/command-output";
import { TerminalOutput } from "../terminal-output";

describe("TerminalOutput", () => {
	it("renders command and response entries", () => {
		const output: CommandOutput[] = [
			{
				command: "ls",
				response: "file1 file2",
				path: ["home", "user"],
			},
			{
				command: "echo Hello",
				response: "Hello",
				path: ["home", "user"],
			},
		];

		render(<TerminalOutput output={output} />);

		// Check if commands and responses are rendered
		expect(screen.getByText("ls")).toBeInTheDocument();
		expect(screen.getByText("file1 file2")).toBeInTheDocument();
		expect(screen.getByText("echo Hello")).toBeInTheDocument();
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders HTML content safely", () => {
		const output: CommandOutput[] = [
			{
				command: "html-test",
				response: "<strong>Bold Text</strong>",
				isHtml: true,
				path: ["home", "user"],
			},
		];

		render(<TerminalOutput output={output} />);

		// Check if HTML is rendered as HTML
		expect(screen.getByText("Bold Text")).toBeInTheDocument();
		expect(screen.getByText("Bold Text").tagName).toBe("STRONG");
	});

	it("renders URLs with correct styling", () => {
		const output: CommandOutput[] = [
			{
				command: "open file",
				response: "http://example.com",
				isUrl: true,
				path: ["home", "user"],
			},
		];

		render(<TerminalOutput output={output} />);

		// Check if URL is rendered and styled correctly
		expect(screen.getByText("http://example.com")).toBeInTheDocument();
		expect(screen.getByText("http://example.com").closest("div")).toHaveClass(
			"flex items-center gap-2",
		);
	});
});
