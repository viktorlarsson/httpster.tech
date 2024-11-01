interface TerminalPromptProps {
	currentPath: string[];
}

export const TerminalPrompt = ({ currentPath }: TerminalPromptProps) => {
	return (
		<span className="opacity-75">
			<span className="hidden sm:inline">
				(base) httpster.tech@MacBook-Pro:~
			</span>
			<span className="sm:hidden">~</span>
			{currentPath.length > 0 ? `/${currentPath.join("/")}` : ""}$
		</span>
	);
};
