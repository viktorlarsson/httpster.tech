import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import useInitialDirectoryDescription from "../useInitialDirectoryDescription";
import { vi, describe, it, expect } from "vitest";
import type { CommandOutput } from "../../types/command-output";

vi.mock("../../utils/get-current-directory", () => ({
	getCurrentDirectory: vi.fn(() => ({
		description: "Initial directory description",
		children: {},
	})),
}));

const TestComponent = ({ initialPath }: { initialPath: string[] }) => {
	const [output, setOutput] = useState<CommandOutput[]>([]);
	useInitialDirectoryDescription(initialPath, setOutput);

	return (
		<div>
			{output.map((entry, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<p key={index} data-testid="output">
					{entry.response}
				</p>
			))}
		</div>
	);
};

describe("useInitialDirectoryDescription", () => {
	it("adds the initial directory description to output on mount", async () => {
		const initialPath = ["root", "folder"];
		render(<TestComponent initialPath={initialPath} />);

		// Check if the description is rendered
		const outputElement = screen.getByTestId("output");
		await waitFor(() =>
			expect(outputElement.textContent).toBe("Initial directory description"),
		);
	});

	it("does not add the description multiple times", async () => {
		const initialPath = ["root", "folder"];
		const { rerender } = render(<TestComponent initialPath={initialPath} />);

		// Rerender with the same initial path
		rerender(<TestComponent initialPath={initialPath} />);

		await waitFor(() => {
			const outputElements = screen.getAllByTestId("output");
			expect(outputElements).toHaveLength(1);
			// @ts-expect-error Caught by the above one
			expect(outputElements[0].textContent).toBe(
				"Initial directory description",
			);
		});
	});
});
