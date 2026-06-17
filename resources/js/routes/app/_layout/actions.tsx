import { createFileRoute } from "@tanstack/react-router";
import { ActionRegister } from "../../../pages/ActionRegister";

export const Route = createFileRoute('/app/_layout/actions')({
  component: ActionRegister,
});
