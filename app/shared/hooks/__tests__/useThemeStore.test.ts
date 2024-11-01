import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useThemeStore } from "../useThemeStore";

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useThemeStore", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("initializes with default mode as dark", () => {
		const { result } = renderHook(() => useThemeStore());

		expect(result.current.mode).toBe("dark");
	});

	it("sets mode to light", () => {
		const { result } = renderHook(() => useThemeStore());

		act(() => {
			result.current.setMode("light");
		});

		expect(result.current.mode).toBe("light");
	});

	it("restores mode from localStorage", () => {
		// Set initial value in localStorage
		localStorage.setItem(
			"theme-storage",
			JSON.stringify({ state: { mode: "light" } }),
		);

		const { result } = renderHook(() => useThemeStore());

		expect(result.current.mode).toBe("light");
	});
});
