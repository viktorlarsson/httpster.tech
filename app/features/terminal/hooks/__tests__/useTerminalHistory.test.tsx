import { render, fireEvent, screen } from "@testing-library/react";
import React, { useState } from "react";
import { describe, it, expect } from "vitest";
import { useTerminalHistory } from "../useTerminalHistory";

// Test component to use the `useTerminalHistory` hook
function TestComponent() {
	const { addToHistory, navigateHistory } = useTerminalHistory();
	const [currentInput, setCurrentInput] = useState("");

	return (
		<div>
			<p data-testid="input">{currentInput}</p>
			<button type="button" onClick={() => addToHistory(currentInput)}>
				Add to History
			</button>
			<button
				type="button"
				onClick={() => navigateHistory("up", currentInput, setCurrentInput)}
			>
				Up
			</button>
			<button
				type="button"
				onClick={() => navigateHistory("down", currentInput, setCurrentInput)}
			>
				Down
			</button>
			<input
				data-testid="history-input"
				value={currentInput}
				onChange={(e) => setCurrentInput(e.target.value)}
			/>
		</div>
	);
}

describe("useTerminalHistory", () => {
	it("adds commands to the history", () => {
		render(<TestComponent />);
		const input = screen.getByTestId("history-input");

		fireEvent.change(input, { target: { value: "command1" } });
		fireEvent.click(screen.getByText("Add to History"));
		fireEvent.change(input, { target: { value: "command2" } });
		fireEvent.click(screen.getByText("Add to History"));

		// Navigate up to access history
		fireEvent.click(screen.getByText("Up"));
		expect(screen.getByTestId("input").textContent).toBe("command2");

		fireEvent.click(screen.getByText("Up"));
		expect(screen.getByTestId("input").textContent).toBe("command1");
	});

	it("navigates up in the history", () => {
		render(<TestComponent />);
		const input = screen.getByTestId("history-input");

		// Add commands to history
		fireEvent.change(input, { target: { value: "first command" } });
		fireEvent.click(screen.getByText("Add to History"));
		fireEvent.change(input, { target: { value: "second command" } });
		fireEvent.click(screen.getByText("Add to History"));

		// Navigate up in history
		fireEvent.click(screen.getByText("Up"));
		expect(screen.getByTestId("input").textContent).toBe("second command");

		fireEvent.click(screen.getByText("Up"));
		expect(screen.getByTestId("input").textContent).toBe("first command");
	});

	it("resets input when navigating down past the earliest command", () => {
		render(<TestComponent />);
		const input = screen.getByTestId("history-input");

		// Add a command to history
		fireEvent.change(input, { target: { value: "only command" } });
		fireEvent.click(screen.getByText("Add to History"));

		// Navigate up and then down
		fireEvent.click(screen.getByText("Up"));
		expect(screen.getByTestId("input").textContent).toBe("only command");

		fireEvent.click(screen.getByText("Down"));
		expect(screen.getByTestId("input").textContent).toBe("");
	});

	it("does nothing when navigating up with an empty history", () => {
		render(<TestComponent />);
		const input = screen.getByTestId("history-input");

		fireEvent.change(input, { target: { value: "test input" } });
		fireEvent.click(screen.getByText("Up"));

		expect(screen.getByTestId("input").textContent).toBe("test input");
	});
});
