import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), "..");
const srcRoot = path.join(projectRoot, "src");
const domainsRoot = path.join(srcRoot, "domains");

function getDomains() {
	return readdirSync(domainsRoot, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

function walkDir(dir, handler) {
	for (const dirent of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, dirent.name);
		if (dirent.isDirectory()) {
			walkDir(fullPath, handler);
		} else if (dirent.isFile() && (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx"))) {
			handler(fullPath);
		}
	}
}

const violations = [];
const domainNames = getDomains();
const legacyLayoutPattern = /@\/components\/layout\//;

for (const domain of domainNames) {
	const domainDir = path.join(domainsRoot, domain);
	walkDir(domainDir, (filePath) => {
		const fileContents = readFileSync(filePath, "utf8");

		if (legacyLayoutPattern.test(fileContents)) {
			violations.push({
				file: filePath,
				message: "Imports from '@/components/layout' are not allowed; use '@/shared/components'.",
			});
		}

	});
}

if (violations.length > 0) {
	console.error("Import boundary violations detected:");
	for (const violation of violations) {
		console.error(`- ${violation.file}: ${violation.message}`);
	}
	process.exitCode = 1;
} else {
	process.exitCode = 0;
}
