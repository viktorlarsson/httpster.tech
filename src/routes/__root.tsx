import { Terminal } from "@/features/terminal/components/terminal";
import { createRootRoute } from "@tanstack/react-router";
import "unfonts.css";
import "../index.css";
import { useThemeStore } from "@/shared/hooks/useThemeStore";

export const Route = createRootRoute({
	component: () => {
		const { mode } = useThemeStore();
		console.log(mode);
		return (
			<div
				className={`min-h-screen ${
					mode === "dark" ? "bg-black text-white" : "bg-white text-black"
				} p-4 font-mono`}
			>
				<Terminal />
			</div>
		);
	},
});
