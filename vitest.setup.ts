// Ensures CommonJS modules expecting `module` global can run under ESM Vitest
if (typeof globalThis.module === "undefined") {
	(globalThis as Record<string, unknown>).module = { exports: {} };
}
