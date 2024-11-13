// PingPong.tsx

import React, { useState, useEffect } from "react";
import { useAiOpponent } from "../hooks/useAiCompletion";

const PingPong = () => {
	const [ball, setBall] = useState({ x: 50, y: 50, dx: 1, dy: 1 });
	const [playerPosition, setPlayerPosition] = useState(50);
	const [aiPosition, setAiPosition] = useState(50);
	const { getAiMove, isLoading } = useAiOpponent();

	useEffect(() => {
		const interval = setInterval(() => {
			setBall((prev) => {
				const newBall = { ...prev, x: prev.x + prev.dx, y: prev.y + prev.dy };

				if (newBall.y <= 0 || newBall.y >= 100) newBall.dy *= -1;
				if (newBall.x <= 5 && Math.abs(newBall.y - playerPosition) < 10)
					newBall.dx *= -1;
				if (newBall.x >= 95 && Math.abs(newBall.y - aiPosition) < 10)
					newBall.dx *= -1;

				return newBall;
			});
		}, 50);

		return () => clearInterval(interval);
	}, [playerPosition, aiPosition]);

	useEffect(() => {
		async function updateAiPosition() {
			if (!isLoading) {
				const aiMove = await getAiMove(ball.y);
				setAiPosition((prev) =>
					Math.min(100, Math.max(0, aiMove === "up" ? prev - 10 : prev + 10)),
				);
			}
		}
		updateAiPosition();
	}, [ball, getAiMove, isLoading]);

	const handlePlayerMove = (direction: "up" | "down") => {
		setPlayerPosition((prev) =>
			Math.min(100, Math.max(0, direction === "up" ? prev - 10 : prev + 10)),
		);
	};

	return (
		<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
			<div
				style={{
					position: "absolute",
					top: `${ball.y}%`,
					left: `${ball.x}%`,
					width: 10,
					height: 10,
					background: "black",
				}}
			/>

			<div
				style={{
					position: "absolute",
					top: `${playerPosition}%`,
					left: "0%",
					width: 10,
					height: 50,
					background: "blue",
				}}
			/>
			<button type="button" onClick={() => handlePlayerMove("up")}>
				Up
			</button>
			<button type="button" onClick={() => handlePlayerMove("down")}>
				Down
			</button>

			<div
				style={{
					position: "absolute",
					top: `${aiPosition}%`,
					right: "0%",
					width: 10,
					height: 50,
					background: "red",
				}}
			/>
		</div>
	);
};

export default PingPong;
