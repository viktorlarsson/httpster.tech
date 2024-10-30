import { Terminal } from "@/features/terminal/components/terminal";
import { createRootRoute } from "@tanstack/react-router";
import "unfonts.css";
import "../index.css";

export const Route = createRootRoute({
	component: () => (
		<div className="min-h-screen bg-black text-white p-4 font-mono">
			<Terminal />
		</div>
	),
});
