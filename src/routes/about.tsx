import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTerminalStore } from "@/hooks/useTerminalStore";

const defaultContent = [
	"",
	"Hello, I'm Viktor Sarström, a seasoned technology leader with over 18 years of experience in the tech industry.",
	"",
	"⚙️ Skills:",
	"- Expert in AI/ML algorithms and data-driven solutions",
	"- Extensive experience with backend engineering and cloud platforms",
	"- Passion for creating scalable, high-performance systems",
	"",
	'Type "help" for available commands',
	"",
	"(Currently working on this site, and I will open source it as soon as it is in good shape!)",
];

export const Route = createFileRoute("/about")({
	component: () => {
		const { addOutput, output, lastCommand } = useTerminalStore();

		useEffect(() => {
			addOutput(defaultContent);
		}, []); // Add dependencies to run effect correctly

		useEffect(() => {
			console.log(lastCommand);
			// Only set the default content if the current content is empty and last command is not "clear"
			if (lastCommand === "clear") {
				addOutput(defaultContent);
			}
		}, [output.length, lastCommand]); // Add dependencies to run effect correctly

		return (
			<div className="whitespace-pre-wrap">
				{/* Render the route content from Zustand */}
				{output.join("\n")}
			</div>
		);
	},
});
