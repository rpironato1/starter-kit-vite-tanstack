// Ensures CommonJS modules expecting `module` global can run under ESM Vitest
const globalRecord = globalThis as Record<string, unknown>;
if (typeof globalRecord["module"] === "undefined") {
	globalRecord["module"] = { exports: {} };
}
