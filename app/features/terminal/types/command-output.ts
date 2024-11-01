export interface CommandOutput {
	command: string;
	response: string;
	path: string[];
	isUrl?: boolean;
	isHtml?: boolean;
	isIntro?: boolean;
}
