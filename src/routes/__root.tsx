import { createRootRoute, Outlet } from "@tanstack/react-router";
import "unfonts.css";
import "../index.css";
import { useThemeStore } from "@/shared/hooks/useThemeStore";
import { TerminalHeader } from "@/features/terminal/components/terminal-header";

export const Route = createRootRoute({
	component: () => {
		const { mode } = useThemeStore();

		return (
			<div
				className={`min-h-screen ${
					mode === "dark" ? "bg-black text-white" : "bg-white text-black"
				} p-4 font-mono`}
			>
				<TerminalHeader />
				<Outlet />
			</div>
		);
	},
});
