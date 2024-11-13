// api/get-ai-move.tsx

import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const Route = createAPIFileRoute("/api/pingpong/move")({
	POST: async ({ request }) => {
		try {
			const { ballPosition } = await request.json();

			const response = await generateObject({
				model: openai("gpt-4-turbo"),
				prompt: `You are an AI paddle in a ping-pong game. The ball is currently at ${ballPosition}. Respond with either { "move": "up" } or { "move": "down" } to intercept the ball.`,
				schema: z.object({ move: z.string() }),
			});

			return json(response);
		} catch (error) {
			return json({ error: "Failed to get AI move" }, { status: 500 });
		}
	},
});
