import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React, { useState } from "react";
import { useTerminalHistory } from "../useTerminalHistory";

// Test component to wrap the hook
const TestComponent = () => {
	const { addToHistory, navigateHistory } = useTerminalHistory();
	const [currentInput, setCurrentInput] = useState("");

	return (
		<div>
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
				data-testid="input"
				value={currentInput}
				onChange={(e) => setCurrentInput(e.target.value)}
			/>
		</div>
	);
};

describe("useTerminalHistory", () => {
	it("adds commands to the history", () => {
		const { getByText, getByTestId } = render(<TestComponent />);
		const input = getByTestId("input") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "command1" } });
		fireEvent.click(getByText("Add to History"));
		fireEvent.change(input, { target: { value: "command2" } });
		fireEvent.click(getByText("Add to History"));

		fireEvent.click(getByText("Up"));
		expect(input.value).toBe("command2");
		fireEvent.click(getByText("Up"));
		expect(input.value).toBe("command1");
	});

	it("cycles through history up and down", () => {
		const { getByText, getByTestId } = render(<TestComponent />);
		const input = getByTestId("input") as HTMLInputElement;

		// Add commands to history
		fireEvent.change(input, { target: { value: "command1" } });
		fireEvent.click(getByText("Add to History"));
		fireEvent.change(input, { target: { value: "command2" } });
		fireEvent.click(getByText("Add to History"));

		// Navigate up twice to reach the earliest command
		fireEvent.click(getByText("Up"));
		fireEvent.click(getByText("Up"));
		expect(input.value).toBe("command1");

		// Navigate down to the most recent command
		fireEvent.click(getByText("Down"));
		expect(input.value).toBe("command2");
	});

	it("resets input when navigating down past the earliest command", () => {
		const { getByText, getByTestId } = render(<TestComponent />);
		const input = getByTestId("input") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "command1" } });
		fireEvent.click(getByText("Add to History"));

		fireEvent.click(getByText("Up"));
		expect(input.value).toBe("command1");

		fireEvent.click(getByText("Down"));
		expect(input.value).toBe(""); // Resets to empty input
	});

	it("does nothing when navigating up with an empty history", () => {
		const { getByText, getByTestId } = render(<TestComponent />);
		const input = getByTestId("input") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "some input" } });
		fireEvent.click(getByText("Up"));
		expect(input.value).toBe("some input"); // Should remain the same
	});
});
