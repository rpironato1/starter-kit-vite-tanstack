/**
 * Lightweight Promise-based sleep helper used by domain services
 * to simulate latency until real agents/orquestradores are wired in.
 */
export function wait(durationMs: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, durationMs);
	});
}

export const AsyncUtils = {
	wait,
};
