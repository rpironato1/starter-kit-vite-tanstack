import { os } from "@orpc/server";
import { z } from "zod";

export const docRouter = {
	docHealth: os.input(z.object({})).handler(() => ({
		status: "ok",
		domain: "doc",
	})),
};
