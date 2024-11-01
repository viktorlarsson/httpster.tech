import { OpenPanel } from "@openpanel/web";

export const op = new OpenPanel({
	// TODO: fix this https://github.com/oven-sh/bun/issues/9877
	clientId: "4658a009-c860-4a67-b499-69bb1b4f8de0",
	trackScreenViews: true,
	trackOutgoingLinks: true,
	trackAttributes: true,
});
