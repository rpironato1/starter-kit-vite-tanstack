import { os } from "@orpc/server";
import { z } from "zod";

export const settingsRouter = {
	settingsHealth: os.input(z.object({})).handler(() => ({
		status: "ok",
		domain: "settings",
	})),
};
