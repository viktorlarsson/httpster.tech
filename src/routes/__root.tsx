import { createRootRoute, Outlet } from "@tanstack/react-router";
import "unfonts.css";
import "../index.css";
import { useThemeStore } from "@/shared/hooks/useThemeStore";

export const Route = createRootRoute({
	component: () => {
		const { mode } = useThemeStore();

		return (
			<div
				className={`min-h-screen ${
					mode === "dark" ? "bg-black text-white" : "bg-white text-black"
				} p-4 font-mono`}
			>
				<Outlet />
			</div>
		);
	},
});
