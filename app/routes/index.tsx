import { createFileRoute } from "@tanstack/react-router";
import { TerminalHeader } from "../features/terminal/components/terminal-header";
import { Terminal } from "../features/terminal/components/terminal";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <TerminalHeader />
      <Terminal initialPath={[]} />
    </>
  ),
});
