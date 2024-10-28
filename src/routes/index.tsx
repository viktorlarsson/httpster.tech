import { useTerminalStore } from "@/hooks/useTerminalStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: () => {
		// Access route content from Zustand store
		const { output, addOutput } = useTerminalStore();
		// Default content for /about route
		const defaultContent = [
			"Hello, I'm Viktor Sarström, a seasoned technology leader with over 18 years of experience in the tech industry.",
			"",
			'Type "help" for available commands or use Tab to autocomplete.',
			"",
			"(Currently working on this site, and I will open source it as soon as it is in good shape!)",

			"",
		];

		useEffect(() => {
			// Only set the default content if the current content is empty
			if (output.length === 0) {
				addOutput(defaultContent);
			}
		}, []);

		return (
			<div className="whitespace-pre-wrap">
				{/* Render the route content from Zustand */}
				{output.join("\n")}
			</div>
		);
	},
});
