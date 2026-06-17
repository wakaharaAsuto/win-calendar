import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/app/_layout/items')({
  component: () => <div>行動項目管理</div>,
});
