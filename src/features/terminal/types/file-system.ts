export interface FileSystem {
	[key: string]: {
		type: "directory" | "file";
		content?: string;
		description?: string;
		children?: { [key: string]: FileSystem[string] };
		url?: string;
	};
}
