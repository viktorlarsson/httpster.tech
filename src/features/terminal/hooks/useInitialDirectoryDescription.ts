import { useEffect, useRef } from "react";
import type { CommandOutput } from "../types/command-output";
import { getCurrentDirectory } from "../utils/get-current-directory";

function useInitialDirectoryDescription(
	initialPath: string[],
	setOutput: React.Dispatch<React.SetStateAction<CommandOutput[]>>,
) {
	const hasPrintedInitialDescription = useRef(false);

	useEffect(() => {
		if (!hasPrintedInitialDescription.current) {
			const initialDirectory = getCurrentDirectory(initialPath);
			if (initialDirectory) {
				setOutput((prev) => [
					...prev,
					{
						command: "",
						response: initialDirectory.description ?? "",
						path: initialPath,
					},
				]);
			}
			hasPrintedInitialDescription.current = true;
		}
	}, [initialPath, setOutput]);
}

export default useInitialDirectoryDescription;
