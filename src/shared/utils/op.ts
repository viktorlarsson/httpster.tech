import { OpenPanel } from "@openpanel/web";

export const op = new OpenPanel({
	clientId: import.meta.env.PUBLIC_OPENPANEL_PK || "",
	trackScreenViews: true,
	trackOutgoingLinks: true,
	trackAttributes: true,
});
