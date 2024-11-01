import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TerminalHeader } from "../terminal-header";

describe("TerminalHeader", () => {
	it("renders with text content", () => {
		render(<TerminalHeader />);

		// Check if the TerminalHeader has any text content
		const headerElement = screen.getByText(
			/type "help" for available commands/i,
		);
		expect(headerElement).toBeInTheDocument();

		// Additional keyword checks without specifying the full text
		expect(headerElement.textContent).toMatch(/scalable products/i);
		expect(headerElement.textContent).toMatch(/CTO/i);
		expect(headerElement.textContent).toMatch(/Gothenburg/i);
	});
});
