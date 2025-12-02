import { os } from "@orpc/server";
import { z } from "zod";

export const photoRouter = {
	photoHealth: os.input(z.object({})).handler(() => ({
		status: "ok",
		domain: "photo",
	})),
};
