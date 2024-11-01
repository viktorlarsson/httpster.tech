import { useThemeStore } from "../shared/hooks/useThemeStore";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { DefaultCatchBoundary } from "~/shared/components/DefaultCatchBoundary";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	meta: () => [
		{
			charSet: "utf-8",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			title: "httpster.tech",
		},
	],
	component: RootComponent,
	links: () => [{ rel: "stylesheet", href: appCss }],
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

const RootDocument = ({ children }: { children: React.ReactNode }) => {
	const { mode } = useThemeStore();

	return (
		<Html>
			<Head>
				<Meta />
			</Head>
			<Body>
				<div
					className={`min-h-screen ${
						mode === "dark" ? "bg-black text-white" : "bg-white text-black"
					} p-4 font-mono`}
				>
					{children}
				</div>

				<ScrollRestoration />
				<Scripts />
			</Body>
		</Html>
	);
};
