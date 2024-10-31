import { Terminal } from "@/features/terminal/components/terminal";
import { TerminalHeader } from "@/features/terminal/components/terminal-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<>
			<TerminalHeader />
			<Terminal initialPath={[]} />
		</>
	),
});
