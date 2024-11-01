import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { TerminalPrompt } from "../terminal-prompt";

afterEach(() => {
	cleanup();
});

describe("TerminalPrompt", () => {
	it("renders the prompt with the current path when `currentPath` is provided", () => {
		render(<TerminalPrompt currentPath={["folder1", "subfolder"]} />);

		const basePrompt = screen.getByText("(base) httpster.tech@MacBook-Pro:~", {
			exact: false,
		});
		expect(basePrompt).toBeInTheDocument();

		const pathText = screen.getByText("/folder1/subfolder$", { exact: false });
		expect(pathText).toBeInTheDocument();
	});

	it("renders correctly on smaller screens by hiding '(base) httpster.tech@MacBook-Pro:~'", () => {
		render(<TerminalPrompt currentPath={[]} />);

		const hiddenPrompts = screen.queryAllByText(
			"(base) httpster.tech@MacBook-Pro:~",
			{ exact: false },
		);
		expect(hiddenPrompts.length).toBeGreaterThan(0);

		for (const element of hiddenPrompts) {
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass("hidden sm:inline");
		}
	});
});
