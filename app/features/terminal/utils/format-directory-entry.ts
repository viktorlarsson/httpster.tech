export const formatDirectoryEntry = (
	name: string,
	type: "directory" | "file",
): string => {
	return type === "directory"
		? `<span class="font-semibold">${name}/</span>`
		: `<span class="opacity-90">${name}</span>`;
};
