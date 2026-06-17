import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/app/_layout/history/$date')({
  component: () => <div>日別行動履歴</div>,
});
