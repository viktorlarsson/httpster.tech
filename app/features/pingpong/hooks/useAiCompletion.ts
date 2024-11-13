import { useCompletion } from "ai/react";

export function useAiOpponent() {
	const { complete, completion, isLoading } = useCompletion({
		api: "/api/get-ai-move",
	});

	async function getAiMove(ballPosition: number) {
		const prompt = `You are an AI paddle in a ping-pong game. The ball is currently at ${ballPosition}. Respond with either { "move": "up" } or { "move": "down" } to intercept the ball.`;

		(await complete) < prompt;

		const aiMove = completion?.data?.move;
		return aiMove === "up" ? "up" : "down";
	}

	return { getAiMove, isLoading };
}
