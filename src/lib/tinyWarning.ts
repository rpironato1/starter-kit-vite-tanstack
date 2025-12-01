export default function tinyWarning(condition: unknown, message: string): void {
	if (condition) {
		return;
	}

	const warningMessage = `Warning: ${String(message)}`;

	if (typeof console !== "undefined" && typeof console.warn === "function") {
		console.warn(warningMessage);
	}

	try {
		throw new Error(warningMessage);
	} catch {
		// Intencionalmente engole o erro para manter o comportamento do pacote original
	}
}
