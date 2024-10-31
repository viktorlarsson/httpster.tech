import { render, fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { vi, describe, it, expect } from "vitest";
import { useTerminalCompletion } from "../useTerminalCompletions";

// Mock `getCompletions`
vi.mock("../../utils/get-completions", () => ({
	getCompletions: vi.fn((input: string) => {
		// Mock completions based on the input for testing purposes
		if (input === "cd") return ["folder1", "folder2"];
		if (input === "cat") return ["file1.txt", "file2.txt"];
		return [];
	}),
}));

function TestComponent({
	initialInput,
	currentPath,
}: { initialInput: string; currentPath: string[] }) {
	const {
		completions,
		completionIndex,
		handleTabCompletion,
		resetCompletions,
	} = useTerminalCompletion();
	const [input, setInput] = useState(initialInput);

	return (
		<div>
			<p data-testid="input">{input}</p>
			<p data-testid="completions">{completions.join(", ")}</p>
			<p data-testid="completionIndex">{completionIndex}</p>
			<button
				type="button"
				onClick={() => handleTabCompletion(input, currentPath, setInput)}
			>
				Tab Complete
			</button>
			<button type="button" onClick={() => resetCompletions()}>
				Reset
			</button>
		</div>
	);
}

describe("useTerminalCompletion", () => {
	it("resets completions correctly", () => {
		render(<TestComponent initialInput="cd" currentPath={["root"]} />);

		// Simulate pressing Tab to get completions
		fireEvent.click(screen.getByText("Tab Complete"));

		// Reset completions
		fireEvent.click(screen.getByText("Reset"));
		expect(screen.getByTestId("completions").textContent).toBe("");
		expect(screen.getByTestId("completionIndex").textContent).toBe("-1");
	});

	it("handles single completion case correctly", () => {
		render(<TestComponent initialInput="cat" currentPath={["root"]} />);

		// Simulate pressing Tab with only one possible completion
		fireEvent.click(screen.getByText("Tab Complete"));
		expect(screen.getByTestId("completions").textContent).toBe(
			"file1.txt, file2.txt",
		);
		expect(screen.getByTestId("completionIndex").textContent).toBe("0");
		expect(screen.getByTestId("input").textContent).toBe("cat file1.txt");
	});
});
