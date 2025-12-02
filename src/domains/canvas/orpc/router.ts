import { os } from "@orpc/server";
import { z } from "zod";

export const canvasRouter = {
	canvasHealth: os.input(z.object({})).handler(() => ({
		status: "ok",
		domain: "canvas",
	})),
};
