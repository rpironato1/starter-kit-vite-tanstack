import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface MessageRendererProps {
	content: string;
	hideCodeBlocks?: boolean;
}

// CodeBlock Component with copy functionality
const CodeBlock: React.FC<{ language: string; code: string }> = ({
	language,
	code,
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="my-4 rounded-xl overflow-hidden border border-white/10 bg-bg-surface shadow-lg">
			<div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/5">
				<span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
					{language || "code"}
				</span>
				<button
					type="button"
					onClick={handleCopy}
					className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 transition-colors px-2 py-1 rounded hover:bg-white/10"
				>
					{copied ? (
						<Check className="w-3.5 h-3.5 text-green-500" />
					) : (
						<Copy className="w-3.5 h-3.5" />
					)}
					{copied ? "Copiado" : "Copiar"}
				</button>
			</div>
			<div className="p-4 overflow-x-auto bg-zinc-950">
				<pre className="font-mono text-sm leading-relaxed text-zinc-300">
					<code>{code}</code>
				</pre>
			</div>
		</div>
	);
};

// Process inline formatting: **bold**, *italic*, `code`, [link](url)
const processInline = (text: string): React.ReactNode => {
	const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

	return parts.map((part) => {
		const partKey = `inline-${part.slice(0, 20).replace(/\W/g, "")}-${part.length}`;
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={partKey} className="font-semibold text-zinc-100">
					{part.slice(2, -2)}
				</strong>
			);
		}
		if (part.startsWith("*") && part.endsWith("*")) {
			return (
				<em key={partKey} className="italic text-zinc-400">
					{part.slice(1, -1)}
				</em>
			);
		}
		if (part.startsWith("`") && part.endsWith("`")) {
			return (
				<code
					key={partKey}
					className="bg-zinc-800 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono"
				>
					{part.slice(1, -1)}
				</code>
			);
		}
		const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
		if (linkMatch) {
			return (
				<a
					key={partKey}
					href={linkMatch[2]}
					target="_blank"
					rel="noopener noreferrer"
					className="text-accent-primary hover:text-accent-textHighlight hover:underline transition-colors"
				>
					{linkMatch[1]}
				</a>
			);
		}
		return part;
	});
};

export const MessageRenderer: React.FC<MessageRendererProps> = ({
	content,
	hideCodeBlocks = false,
}) => {
	if (!content) return null;

	// Pre-process: hide code blocks if requested (for Canvas mode)
	let displayContent = content;
	if (hideCodeBlocks) {
		displayContent = displayContent.replace(/```[\s\S]*?```/g, "");
	}

	// Split content to handle code blocks separately
	const parts = displayContent.split(/(```[\s\S]*?```)/g);

	return (
		<div className="space-y-2 text-[15px] leading-relaxed text-text-primary">
			{parts.map((part) => {
				const partKey = `part-${part.slice(0, 30).replace(/\W/g, "")}-${part.length}`;
				// Render code blocks
				if (part.startsWith("```")) {
					const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
					if (match) {
						const language = match[1] ?? "";
						const code = match[2] ?? "";
						return <CodeBlock key={partKey} language={language} code={code} />;
					}
					return null;
				}

				// Render text content
				const lines = part.split("\n");
				return (
					<div key={partKey} className="space-y-2">
						{lines.map((line, idx) => {
							const trimmed = line.trim();
							const lineKey = `${partKey}-line-${idx}`;

							// Empty line - spacing
							if (!trimmed) return <div key={lineKey} className="h-2" />;

							// Headers
							if (trimmed.startsWith("### ")) {
								return (
									<h3
										key={lineKey}
										className="text-base font-medium text-accent-textHighlight mt-4 mb-2 font-serif"
									>
										{processInline(trimmed.slice(4))}
									</h3>
								);
							}
							if (trimmed.startsWith("## ")) {
								return (
									<h2
										key={lineKey}
										className="text-lg font-medium text-accent-textHighlight mt-5 mb-2 font-serif"
									>
										{processInline(trimmed.slice(3))}
									</h2>
								);
							}
							if (trimmed.startsWith("# ")) {
								return (
									<h1
										key={lineKey}
										className="text-xl font-medium text-accent-textHighlight mt-6 mb-3 font-serif"
									>
										{processInline(trimmed.slice(2))}
									</h1>
								);
							}

							// Bullet lists (- or *)
							if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
								return (
									<div key={lineKey} className="flex gap-3 pl-1">
										<span className="text-accent-primary mt-1.5">•</span>
										<span className="flex-1">
											{processInline(trimmed.slice(2))}
										</span>
									</div>
								);
							}

							// Numbered lists (1. 2. 3.)
							if (/^\d+\.\s/.test(trimmed)) {
								const itemContent = trimmed.replace(/^\d+\.\s/, "");
								const number = trimmed.match(/^\d+\./)?.[0];
								return (
									<div key={lineKey} className="flex gap-3 pl-1">
										<span className="text-accent-primary font-mono font-bold text-xs mt-1">
											{number}
										</span>
										<span className="flex-1">{processInline(itemContent)}</span>
									</div>
								);
							}

							// Blockquotes (>)
							if (trimmed.startsWith("> ")) {
								return (
									<div
										key={lineKey}
										className="border-l-2 border-accent-primary pl-4 py-1 my-2 bg-white/5 rounded-r-lg italic text-zinc-400"
									>
										{processInline(trimmed.slice(2))}
									</div>
								);
							}

							// Horizontal rules (--- or ***)
							if (trimmed === "---" || trimmed === "***") {
								return <hr key={lineKey} className="border-zinc-800 my-4" />;
							}

							// Skip code fence markers
							if (trimmed.startsWith("```")) {
								return null;
							}

							// Normal paragraph
							return (
								<p key={lineKey} className="text-text-primary">
									{processInline(line)}
								</p>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default MessageRenderer;
