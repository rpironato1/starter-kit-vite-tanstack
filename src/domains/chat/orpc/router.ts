import { os } from "@orpc/server";
import { z } from "zod";

/**
 * Placeholder router for Chat domain.
 * Substituir pelos contratos reais assim que integrarmos Supabase/Edge Functions.
 */
export const chatRouter = {
	chatHealth: os.input(z.object({})).handler(() => ({
		status: "ok",
		domain: "chat",
	})),
};
