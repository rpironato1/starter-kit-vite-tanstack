interface CodeEditorProps {
	content: string;
	language: string;
	onChange: (content: string) => void;
}

export function CodeEditor({ content, language, onChange }: CodeEditorProps) {
	return (
		<div className="w-full h-full relative">
			<textarea
				value={content}
				onChange={(e) => onChange(e.target.value)}
				spellCheck={false}
				className="w-full h-full bg-bg-surface text-text-primary font-mono text-sm p-4 resize-none focus:outline-none focus:ring-1 focus:ring-accent-primary/50"
				placeholder={`// Enter ${language} code here...`}
			/>
		</div>
	);
}
