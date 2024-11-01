import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "~/features/terminal/components/terminal";

export const Route = createFileRoute("/about")({
	component: () => <Terminal initialPath={["about"]} />,
});
