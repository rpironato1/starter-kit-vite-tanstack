type PromptLocale = "en" | "pt";

const QUALITY_TAGS: Record<PromptLocale, string[]> = {
	en: [
		"hyper-realistic",
		"8k resolution",
		"ultra-detailed textures",
		"cinematic lighting",
	],
	pt: [
		"hiper-realista",
		"8k de resolução",
		"texturas ultra detalhadas",
		"iluminação cinematográfica",
	],
};

const CAMERA_STYLES: Record<
	"portrait" | "landscape" | "macro",
	Record<PromptLocale, string>
> = {
	portrait: {
		en: "Portrait lens, f/1.8, 50mm",
		pt: "Lente retrato, f/1.8, 50mm",
	},
	landscape: {
		en: "Wide angle lens, f/4.0, 24mm",
		pt: "Lente grande angular, f/4.0, 24mm",
	},
	macro: {
		en: "Macro lens, f/2.8, 100mm",
		pt: "Lente macro, f/2.8, 100mm",
	},
};

interface LocaleLabel {
	match: RegExp;
	label: Record<PromptLocale, string>;
}

const MEDIUM_MAP: LocaleLabel[] = [
	{
		match: /painting|brush|canvas|pintura/i,
		label: {
			en: "Oil painting on textured canvas",
			pt: "Pintura a óleo em tela texturizada",
		},
	},
	{
		match: /photo|photography|portrait|foto|retrata/i,
		label: {
			en: "Studio photography with seamless backdrop",
			pt: "Fotografia de estúdio com fundo infinito",
		},
	},
	{
		match: /cyberpunk|future|neon/i,
		label: {
			en: "Cyberpunk digital art",
			pt: "Arte digital cyberpunk",
		},
	},
	{
		match: /fantasy|dragon|magic|dragão|mágico/i,
		label: {
			en: "High fantasy concept art",
			pt: "Concept art de fantasia épica",
		},
	},
];

const LIGHTING_MAP: LocaleLabel[] = [
	{
		match: /night|noite|dark|escuro/i,
		label: {
			en: "Moody neon lighting with volumetric fog",
			pt: "Neon dramático com neblina volumétrica",
		},
	},
	{
		match: /sunset|golden|amanhecer|sunrise|dourad/i,
		label: {
			en: "Golden hour lighting with long, soft shadows",
			pt: "Luz de golden hour com sombras suaves e longas",
		},
	},
	{
		match: /studio|portrait|fashion|estúdio/i,
		label: {
			en: "Three-point studio lighting with soft fill",
			pt: "Iluminação de estúdio em três pontos com fill suave",
		},
	},
];

const DEFAULT_COPY = {
	medium: {
		en: "Cinematic digital illustration",
		pt: "Ilustração digital cinematográfica",
	},
	lighting: {
		en: "Soft rim lighting with subtle bloom",
		pt: "Luz de recorte suave com bloom sutil",
	},
	camera: {
		en: "Portrait lens, f/1.8, 50mm",
		pt: "Lente retrato, f/1.8, 50mm",
	},
	tone: {
		en: "Elegant, editorial tone with grounded realism",
		pt: "Tom editorial elegante com realismo controlado",
	},
};

const TONE_MAP: LocaleLabel[] = [
	{
		match: /fashion|editorial|revista/i,
		label: {
			en: "Editorial, magazine-ready energy",
			pt: "Energia editorial pronta para revista",
		},
	},
	{
		match: /tech|futur/i,
		label: {
			en: "Futuristic optimism with neon cues",
			pt: "Otimismo futurista com acentos neon",
		},
	},
	{
		match: /nature|forest|floresta/i,
		label: {
			en: "Organic calm inspired by nature",
			pt: "Calma orgânica inspirada na natureza",
		},
	},
];

const FIELD_LABELS: Record<
	PromptLocale,
	{
		medium: string;
		lighting: string;
		camera: string;
		quality: string;
		tone: string;
	}
> = {
	en: {
		medium: "Medium",
		lighting: "Lighting",
		camera: "Camera",
		quality: "Quality",
		tone: "Tone",
	},
	pt: {
		medium: "Meio",
		lighting: "Iluminação",
		camera: "Ângulo",
		quality: "Qualidade",
		tone: "Tom",
	},
};

function detectLocale(prompt: string): PromptLocale {
	const normalized = prompt.normalize("NFD").toLowerCase();
	if (/[áàâãéêíóôõúç]/.test(normalized)) {
		return "pt";
	}
	if (
		/(\bde\b|\bpara\b|\bcom\b|\buma\b|\bum\b|\bnos\b|\bnas\b)/.test(normalized)
	) {
		return "pt";
	}
	return "en";
}

function pickMedium(prompt: string, locale: PromptLocale) {
	const medium = MEDIUM_MAP.find(({ match }) => match.test(prompt));
	return medium?.label[locale] ?? DEFAULT_COPY.medium[locale];
}

function pickLighting(prompt: string, locale: PromptLocale) {
	const lighting = LIGHTING_MAP.find(({ match }) => match.test(prompt));
	return lighting?.label[locale] ?? DEFAULT_COPY.lighting[locale];
}

function pickCamera(prompt: string, locale: PromptLocale) {
	if (/macro|detalh/i.test(prompt)) return CAMERA_STYLES.macro[locale];
	if (/landscape|wide|paisagem/i.test(prompt))
		return CAMERA_STYLES.landscape[locale];
	return CAMERA_STYLES.portrait[locale];
}

function pickTone(prompt: string, locale: PromptLocale) {
	const tone = TONE_MAP.find(({ match }) => match.test(prompt));
	return tone?.label[locale] ?? DEFAULT_COPY.tone[locale];
}

function formatSubject(prompt: string) {
	const trimmed = prompt.trim();
	if (!trimmed) return "";
	return trimmed[0].toUpperCase() + trimmed.slice(1);
}

export async function enhancePrompt(rawPrompt: string): Promise<string> {
	const subject = formatSubject(rawPrompt);
	if (!subject) return "";

	const locale = detectLocale(rawPrompt);
	const medium = pickMedium(rawPrompt, locale);
	const lighting = pickLighting(rawPrompt, locale);
	const camera = pickCamera(rawPrompt, locale);
	const tone = pickTone(rawPrompt, locale);
	const quality = QUALITY_TAGS[locale].join(", ");
	const labels = FIELD_LABELS[locale];

	const sections = [
		subject,
		`${labels.medium}: ${medium}`,
		`${labels.lighting}: ${lighting}`,
		`${labels.camera}: ${camera}`,
		`${labels.quality}: ${quality}`,
		`${labels.tone}: ${tone}`,
	];

	return sections.join("\n");
}

export const PromptEnhancer = {
	enhance: enhancePrompt,
};

export default PromptEnhancer;
