import { Terminal } from "@/features/terminal/components/terminal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: () => <Terminal initialPath={["about"]} />,
});
