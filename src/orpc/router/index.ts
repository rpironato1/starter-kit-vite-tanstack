import { canvasRouter } from "@/domains/canvas/orpc/router";
import { chatRouter } from "@/domains/chat/orpc/router";
import { docRouter } from "@/domains/doc/orpc/router";
import { photoRouter } from "@/domains/photo/orpc/router";
import { settingsRouter } from "@/domains/settings/orpc/router";

const router = {
	...chatRouter,
	...photoRouter,
	...docRouter,
	...canvasRouter,
	...settingsRouter,
};

export type AppRouter = typeof router;

export default router;
