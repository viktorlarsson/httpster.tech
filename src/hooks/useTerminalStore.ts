import { create } from "zustand";

// Define the store interface
interface TerminalState {
	output: string[]; // Terminal output
	routeContent: string[]; // Route content to display
	isCleared: boolean; // Flag to indicate if terminal has been cleared
	lastCommand: string | null; // Last executed command
	clearOutput: () => void; // Function to clear output
	addOutput: (newLine: string[]) => void; // Function to add output
	setRouteContent: (content: string[]) => void; // Function to set route content
	setLastCommand: (command: string) => void; // Function to set last executed command
}

// Create the Zustand store
export const useTerminalStore = create<TerminalState>((set) => ({
	output: [],
	routeContent: [],
	isCleared: false, // Initial cleared state is false
	lastCommand: null, // Initial last command is null

	clearOutput: () =>
		set(() => ({
			output: [],
			routeContent: [], // Clear route content
			isCleared: true, // Set cleared state to true
			lastCommand: null, // Reset last command when clearing
		})),

	addOutput: (newLine: string[]) =>
		set((state) => ({
			output: [...state.output, "", ...newLine],
			isCleared: false, // Reset cleared state when adding new output
		})),

	setRouteContent: (content: string[]) =>
		set(() => ({
			routeContent: content,
		})),

	setLastCommand: (command: string) =>
		set(() => ({
			lastCommand: command,
		})),
}));
