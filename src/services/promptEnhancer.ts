const QUALITY_TAGS = [
	"hyperrealistic",
	"8k resolution",
	"ultra-detailed textures",
	"cinematic lighting",
];

const CAMERA_STYLES = {
	portrait: "Portrait lens, f/1.8, 50mm",
	landscape: "Wide angle lens, f/4.0, 24mm",
	macro: "Macro lens, f/2.8, 100mm",
};

const MEDIUM_MAP = [
	{ match: /painting|brush|canvas/i, label: "Oil painting on textured canvas" },
	{
		match: /photo|photography|portrait/i,
		label: "Studio photography with seamless backdrop",
	},
	{ match: /cyberpunk|future|neon/i, label: "Cyberpunk digital art" },
	{
		match: /fantasy|dragon|magic/i,
		label: "High fantasy concept art",
	},
];

const LIGHTING_MAP = [
	{
		match: /night|noite|dark/i,
		label: "Moody neon lighting with volumetric fog",
	},
	{
		match: /sunset|golden|amanhecer|sunrise/i,
		label: "Golden hour lighting with long, soft shadows",
	},
	{
		match: /studio|portrait|fashion/i,
		label: "Three-point studio lighting with soft fill",
	},
];

function pickMedium(prompt: string) {
	const medium = MEDIUM_MAP.find(({ match }) => match.test(prompt));
	return medium?.label ?? "Cinematic digital illustration";
}

function pickLighting(prompt: string) {
	const lighting = LIGHTING_MAP.find(({ match }) => match.test(prompt));
	return lighting?.label ?? "Soft rim lighting with subtle bloom";
}

function pickCamera(prompt: string) {
	if (/macro|detail/i.test(prompt)) return CAMERA_STYLES.macro;
	if (/landscape|wide/i.test(prompt)) return CAMERA_STYLES.landscape;
	return CAMERA_STYLES.portrait;
}

function formatSubject(prompt: string) {
	const trimmed = prompt.trim();
	if (!trimmed) return "";
	return trimmed[0].toUpperCase() + trimmed.slice(1);
}

export async function enhancePrompt(rawPrompt: string): Promise<string> {
	const subject = formatSubject(rawPrompt);
	if (!subject) return "";

	const medium = pickMedium(rawPrompt);
	const lighting = pickLighting(rawPrompt);
	const camera = pickCamera(rawPrompt);

	const quality = QUALITY_TAGS.join(", ");

	return `${subject}. Medium: ${medium}. Lighting: ${lighting}. Camera: ${camera}. Quality: ${quality}.`;
}

export const PromptEnhancer = {
	enhance: enhancePrompt,
};

export default PromptEnhancer;
