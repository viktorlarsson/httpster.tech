interface TerminalPromptProps {
	currentPath: string[];
}

export const TerminalPrompt = ({ currentPath }: TerminalPromptProps) => {
	return (
		<span className="opacity-75">
			(base) httpster.tech@MacBook-Pro:~
			{currentPath.length > 0 ? `/${currentPath.join("/")}` : ""}$
		</span>
	);
};
