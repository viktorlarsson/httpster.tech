import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TerminalInput } from "../terminal-input";

describe("TerminalInput", () => {
	it("renders the input field", () => {
		const mockSetCurrentInput = vi.fn();
		const mockOnKeyDown = vi.fn();
		const inputRef = { current: null } as React.RefObject<HTMLInputElement>;

		render(
			<TerminalInput
				currentPath={["home", "user"]}
				currentInput=""
				setCurrentInput={mockSetCurrentInput}
				onKeyDown={mockOnKeyDown}
				inputRef={inputRef}
			/>,
		);

		// Check if input is rendered
		const inputElement = screen.getByRole("textbox");
		expect(inputElement).toBeInTheDocument();
	});

	it("calls setCurrentInput on input change", () => {
		const mockSetCurrentInput = vi.fn();
		const mockOnKeyDown = vi.fn();
		const inputRef = { current: null } as React.RefObject<HTMLInputElement>;

		render(
			<TerminalInput
				currentPath={["home", "user"]}
				currentInput=""
				setCurrentInput={mockSetCurrentInput}
				onKeyDown={mockOnKeyDown}
				inputRef={inputRef}
			/>,
		);

		// Simulate typing in the input
		const inputElement = screen.getByRole("textbox");
		fireEvent.change(inputElement, { target: { value: "test input" } });

		expect(mockSetCurrentInput).toHaveBeenCalledWith("test input");
	});

	it("calls onKeyDown when a key is pressed", () => {
		const mockSetCurrentInput = vi.fn();
		const mockOnKeyDown = vi.fn();
		const inputRef = { current: null } as React.RefObject<HTMLInputElement>;

		render(
			<TerminalInput
				currentPath={["home", "user"]}
				currentInput=""
				setCurrentInput={mockSetCurrentInput}
				onKeyDown={mockOnKeyDown}
				inputRef={inputRef}
			/>,
		);

		// Simulate key down event
		const inputElement = screen.getByRole("textbox");
		fireEvent.keyDown(inputElement, { key: "Enter" });

		expect(mockOnKeyDown).toHaveBeenCalled();
	});
});
