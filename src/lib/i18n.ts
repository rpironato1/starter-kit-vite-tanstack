/**
 * Sistema de internacionalização (i18n) para Zane Chat AI
 * Suporta pt-BR e en-US
 */

export type Language = "pt-BR" | "en-US";

interface ModeCardTranslation {
	title: string;
	description: string;
	action: string;
	meta: string;
}

type ModeKey = "chat" | "photo" | "doc" | "canvas";
type ModelKey = "mini" | "solo" | "pro" | "ultra";
type ModelBadgeKey = "recommended" | "balanced" | "flagship" | "creative";

interface ModelMetaCopy {
	tier: string;
	contextWindow: string;
	latency: string;
	bestFor: string;
}

interface EmptyStateCopy {
	title: string;
	subtitle: string;
	subtitleWithModel?: string;
}

export interface Translations {
	welcome: {
		line1: string;
		line2: string;
	};
	input: {
		placeholder: string;
		thinking: string;
		attached: string;
		camera: string;
		photos: string;
		files: string;
	};
	sidebar: {
		chats: string;
		photo: string;
		doc: string;
		canvas: string;
		history: string;
		newChat: string;
		noHistory: string;
		menu: string;
	};
	settings: {
		title: string;
		profile: string;
		plan: string;
		features: string;
		refinement: string;
		memory: string;
		appearance: string;
		language: string;
		notification: string;
		privacy: string;
		system: string;
		logout: string;
		themeDark: string;
		themeLight: string;
	};
	plan: {
		title: string;
		accountPlan: string;
		currentPlanName: string;
		manageAccount: string;
		restorePurchases: string;
		alertTitle: string;
		alertMessage: string;
		ok: string;
	};
	profile: {
		title: string;
		fullName: string;
		fullNamePlaceholder: string;
		email: string;
		emailPlaceholder: string;
		dob: string;
		updatePassword: string;
		deleteAccount: string;
		save: string;
	};
	refinement: {
		title: string;
		nameLabel: string;
		namePlaceholder: string;
		genderLabel: string;
		genderPlaceholder: string;
		genderMale: string;
		genderFemale: string;
		genderOther: string;
		workLabel: string;
		workPlaceholder: string;
		aboutLabel: string;
		aboutPlaceholder: string;
		styleLabel: string;
		stylePlaceholder: string;
		save: string;
		skip: string;
	};
	memory: {
		title: string;
		factsTitle: string;
		timelineTitle: string;
		factsDescription: string;
		timelineDescription: string;
		timelineWarning: string;
		enableMemory: string;
		enableTimeline: string;
		deleteTimeline: string;
		deleteConfirm: string;
		emptyMemory: string;
		mockTime1: string;
		mockItem1a: string;
		mockItem1b: string;
		mockItem1c: string;
		mockTime2: string;
		mockItem2a: string;
		mockItem2b: string;
		mockTime3: string;
		mockItem3a: string;
		mockTime7Days: string;
		mockTime30Days: string;
		mockTimeYear: string;
	};
	notifications: {
		title: string;
		responses: string;
		responsesDesc: string;
		news: string;
		newsDesc: string;
	};
	privacy: {
		title: string;
		sectionData: string;
		modelTraining: string;
		modelTrainingDesc: string;
		retention: string;
		retentionPlaceholder: string;
		retentionIndefinite: string;
		retention1Year: string;
		retention30Days: string;
		sectionSecurity: string;
		biometric: string;
		biometricDesc: string;
		safeSearch: string;
		safeSearchDesc: string;
		sectionRights: string;
		exportData: string;
		exportDesc: string;
		alertExportTitle: string;
		alertExportMsg: string;
	};
	system: {
		title: string;
		desc: string;
		runTests: string;
		running: string;
		success: string;
		fail: string;
		consoleTitle: string;
	};
	models: {
		mini: string;
		solo: string;
		pro: string;
		ultra: string;
		selectModel: string;
		close: string;
		heroTitle: string;
		heroSubtitle: string;
		activeLabel: string;
		cta: string;
	};
	modelsMeta: Record<ModelKey, ModelMetaCopy>;
	modelsBadges: Record<ModelBadgeKey, string>;
	reasoning: {
		title: string;
		soft: string;
		medium: string;
		max: string;
		off: string;
		offDescription: string;
	};
	message: {
		copy: string;
		copied: string;
		like: string;
		dislike: string;
		retry: string;
		tokenUsage: string;
		sources: string;
	};
	emptyState: {
		chat: EmptyStateCopy;
		photo: EmptyStateCopy;
		doc: EmptyStateCopy;
		canvas: EmptyStateCopy;
	};
	modes: Record<ModeKey, ModeCardTranslation>;
	photoView: {
		toolbarTitle: string;
		toolbarDescription: string;
		ratioLabel: string;
		ratioAction: string;
		galleryCta: string;
		enhancerLocked: string;
		enhancerReady: string;
	};
	canvasView: {
		reasoningTitle: string;
		reasoningSubtitle: string;
	};
}

export const translations: Record<Language, Translations> = {
	"pt-BR": {
		welcome: {
			line1: "Como posso te ajudar",
			line2: "esta noite?",
		},
		input: {
			placeholder: "Chat com Zane",
			thinking: "Pensando...",
			attached: "Imagem anexada",
			camera: "Câmera",
			photos: "Fotos",
			files: "Arquivos",
		},
		sidebar: {
			chats: "Conversas",
			photo: "Zane Photo",
			doc: "Zane Doc",
			canvas: "Zane Canvas",
			history: "Histórico Recente",
			newChat: "Nova Conversa",
			noHistory: "Nenhum histórico",
			menu: "Menu",
		},
		settings: {
			title: "Configurações",
			profile: "Perfil",
			plan: "Plano",
			features: "Funcionalidades",
			refinement: "Refinamento",
			memory: "Memória",
			appearance: "Aparência",
			language: "Idioma",
			notification: "Notificações",
			privacy: "Privacidade",
			system: "Sistema e Diagnóstico",
			logout: "Sair",
			themeDark: "Escuro",
			themeLight: "Claro",
		},
		plan: {
			title: "Plano",
			accountPlan: "Plano da conta",
			currentPlanName: "Pro",
			manageAccount: "Gerenciar Conta",
			restorePurchases: "Restaurar compras",
			alertTitle: "Gerenciar Conta",
			alertMessage: "Por favor, aguarde um instante",
			ok: "OK",
		},
		profile: {
			title: "Perfil",
			fullName: "Nome Completo",
			fullNamePlaceholder: "Seu nome completo",
			email: "E-mail",
			emailPlaceholder: "seu@email.com",
			dob: "Data de Nascimento",
			updatePassword: "Atualizar Senha",
			deleteAccount: "Apagar Conta",
			save: "Salvar Alterações",
		},
		refinement: {
			title: "Refinamento",
			nameLabel: "Como devo te chamar?",
			namePlaceholder: "Seu nome ou apelido",
			genderLabel: "Sexo",
			genderPlaceholder: "Selecione uma opção",
			genderMale: "Masculino",
			genderFemale: "Feminino",
			genderOther: "Outro",
			workLabel: "Área de Trabalho/Estudo/Interesses",
			workPlaceholder:
				"Ex: Desenvolvimento de Software, Marketing, Artes... (Max 250 caractéres)",
			aboutLabel: "Me fale mais sobre você",
			aboutPlaceholder:
				"Compartilhe um pouco sobre sua rotina, objetivos ou ideias... (Max 600 caractéres)",
			styleLabel: "Como gostaria que eu trabalhasse com você",
			stylePlaceholder:
				"Ex: Seja direto, use analogias, explique passo a passo... (Max 600 caractéres)",
			save: "Salvar",
			skip: "Pular por enquanto",
		},
		memory: {
			title: "Memória",
			factsTitle: "Memória de Fatos",
			timelineTitle: "Linha do Tempo",
			factsDescription:
				"Permita que Zane lembre conteúdos relavantes dos diálogos. Estes conteúdos serão usados dinâmicamente para lembrar Zane de fatos importantes.",
			timelineDescription:
				"Permita que Zane crie linha temporal das suas interações. Zane usa para entender cronologia de projetos e comparar eventos passados.",
			timelineWarning:
				"A linha do tempo não pode ser modificada item a item, mas você pode desativar ou excluir todo o histórico.",
			enableMemory: "Ativar Memória",
			enableTimeline: "Ativar Linha do Tempo",
			deleteTimeline: "Excluir Linha do Tempo",
			deleteConfirm: "Isso apagará todo o histórico de eventos. Tem certeza?",
			emptyMemory: "Nenhuma memória salva ainda.",
			mockTime1: "23/11/2025",
			mockItem1a: "backend rust e supabase",
			mockItem1b: "Design de interiores com autocad",
			mockItem1c:
				"Criação de convites para festa de aniversário da filha de 11 anos.",
			mockTime2: "22/11/2025",
			mockItem2a: "Problemas crônicos do BYD Song Pro",
			mockItem2b: "Quem veio primeiro, o ovo ou a galinha?",
			mockTime3: "20/11/2025",
			mockItem3a: "Criação de minuta para processo jurídico",
			mockTime7Days: "Últimos 7 dias",
			mockTime30Days: "Últimos 30 dias",
			mockTimeYear: "Último Ano",
		},
		notifications: {
			title: "Notificações",
			responses: "Respostas do Zane",
			responsesDesc: "Receber notificação quando Zane terminar uma tarefa",
			news: "Novidades",
			newsDesc:
				"Receber em primeira mão notificações de novidades sobre o Zane",
		},
		privacy: {
			title: "Privacidade e Segurança",
			sectionData: "Dados e IA",
			modelTraining: "Treinamento de Modelo",
			modelTrainingDesc:
				"Permitir que interações anônimas ajudem a melhorar o Zane.",
			retention: "Retenção de Dados",
			retentionPlaceholder: "Selecione o período",
			retentionIndefinite: "Indefinido",
			retention1Year: "1 Ano",
			retention30Days: "30 Dias",
			sectionSecurity: "Segurança",
			biometric: "Bloqueio Biométrico",
			biometricDesc: "Exigir FaceID/TouchID ao abrir",
			safeSearch: "Filtro de Conteúdo",
			safeSearchDesc: "Ocultar conteúdo sensível ou inseguro",
			sectionRights: "Seus Dados",
			exportData: "Solicitar meus dados",
			exportDesc: "Enviaremos um arquivo JSON para seu e-mail.",
			alertExportTitle: "Solicitação Recebida",
			alertExportMsg:
				"O link para download será enviado para seu e-mail em até 24h.",
		},
		system: {
			title: "Sistema e Diagnósticos",
			desc: "Ferramentas avançadas para verificação de integridade do sistema.",
			runTests: "Executar Verificação de Backend",
			running: "Executando testes...",
			success: "Sistema Operacional",
			fail: "Falha no Sistema",
			consoleTitle: "Log de Execução",
		},
		models: {
			mini: "Pesquisa (Google Grounding) e tarefas rápidas",
			solo: "Respostas ultrarrápidas (Lite)",
			pro: "Raciocínio complexo e tarefas longas",
			ultra: "Geração de Imagem (1K/2K/4K) e Edição",
			selectModel: "Selecionar Modelo",
			close: "Fechar",
			heroTitle: "Selecione o cérebro ideal para esta sessão",
			heroSubtitle:
				"Cada modelo compartilha a mesma memória e segurança. Troque sem interromper o fluxo.",
			activeLabel: "Modelo ativo",
			cta: "Guia completo de modelos",
		},
		modelsMeta: {
			mini: {
				tier: "Lite",
				contextWindow: "Ctx 64k",
				latency: "Latência ~0,6s",
				bestFor: "Fluxos rápidos, buscas e tarefas cotidianas.",
			},
			solo: {
				tier: "Solo",
				contextWindow: "Ctx 128k",
				latency: "Latência ~0,9s",
				bestFor: "Conversas focadas com um pouco mais de contexto.",
			},
			pro: {
				tier: "Pro",
				contextWindow: "Ctx 256k",
				latency: "Latência ~1,2s",
				bestFor: "Planos longos, raciocínio estruturado e revisões complexas.",
			},
			ultra: {
				tier: "Ultra",
				contextWindow: "Ctx 256k + Imagens",
				latency: "Latência ~1,5s",
				bestFor: "Workflows multimodais, geração visual e edições detalhadas.",
			},
		},
		modelsBadges: {
			recommended: "Recomendado",
			balanced: "Equilíbrio",
			flagship: "Flagship",
			creative: "Criativo",
		},
		reasoning: {
			title: "Nível de Raciocínio",
			soft: "Rápido e direto (1k tokens)",
			medium: "Equilibrado (2k tokens)",
			max: "Análise profunda (4k tokens)",
			off: "Raciocínio Desativado",
			offDescription: "Raciocínio desativado",
		},
		message: {
			copy: "Copiar resposta",
			copied: "Copiado!",
			like: "Gostei",
			dislike: "Não gostei",
			retry: "Tentar novamente",
			tokenUsage: "Ver consumo de tokens",
			sources: "Fontes consultadas",
		},
		emptyState: {
			chat: {
				title: "Olá! Como posso ajudar?",
				subtitle: "Faça uma pergunta para começar",
			},
			photo: {
				title: "Zane Photo Studio",
				subtitle:
					"Imagine, descreva e crie. Use o poder do Zane para dar vida às suas ideias.",
				subtitleWithModel:
					"Imagine, descreva e crie. Use o poder do {{model}} para dar vida às suas ideias.",
			},
			doc: {
				title: "Zane Doc",
				subtitle:
					"Faça upload de documentos de texto ou código e converse com eles.",
			},
			canvas: {
				title: "Zane Canvas",
				subtitle:
					"Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.",
			},
		},
		modes: {
			chat: {
				title: "Conversas",
				description:
					"Planeje conversas longas, revise entregas com agentes e acompanhe decisões em tempo real.",
				action: "Abrir Conversas",
				meta: "Raciocínio + Grounding",
			},
			photo: {
				title: "Zane Photo",
				description:
					"Descreva cenas e gere imagens em 1K/2K/4K com edição contextual e refino rápido.",
				action: "Ir para Photo",
				meta: "Renderização 1K/2K/4K",
			},
			doc: {
				title: "Zane Doc",
				description:
					"Faça upload de arquivos técnicos, código ou contratos e converse com os documentos.",
				action: "Abrir Doc",
				meta: "Upload + Insights",
			},
			canvas: {
				title: "Zane Canvas",
				description:
					"Estruture projetos complexos com workspace persistente e blocos colaborativos.",
				action: "Explorar Canvas",
				meta: "Workspace Vivo",
			},
		},
		photoView: {
			toolbarTitle: "Estúdio Zane Photo",
			toolbarDescription:
				"Descreva estilos, luzes e texturas. O Zane ajusta o modelo visual em tempo real.",
			ratioLabel: "Proporção ativa",
			ratioAction: "Alterar",
			galleryCta: "Abrir galeria",
			enhancerLocked: "Disponível nos modelos Lite e Pro",
			enhancerReady: "Spark prontos para refinar",
		},
		canvasView: {
			reasoningTitle: "Raciocínio em andamento",
			reasoningSubtitle:
				"Zane Canvas está criando o plano de execução antes de gerar o artefato.",
		},
	},
	"en-US": {
		welcome: {
			line1: "How can I help you",
			line2: "tonight?",
		},
		input: {
			placeholder: "Chat with Zane",
			thinking: "Thinking...",
			attached: "Image attached",
			camera: "Camera",
			photos: "Photos",
			files: "Files",
		},
		sidebar: {
			chats: "Chats",
			photo: "Zane Photo",
			doc: "Zane Doc",
			canvas: "Zane Canvas",
			history: "Recent History",
			newChat: "New Chat",
			noHistory: "No history",
			menu: "Menu",
		},
		settings: {
			title: "Settings",
			profile: "Profile",
			plan: "Plan",
			features: "Features",
			refinement: "Refinement",
			memory: "Memory",
			appearance: "Appearance",
			language: "Language",
			notification: "Notifications",
			privacy: "Privacy",
			system: "System & Diagnostics",
			logout: "Log out",
			themeDark: "Dark",
			themeLight: "Light",
		},
		plan: {
			title: "Plan",
			accountPlan: "Account Plan",
			currentPlanName: "Pro",
			manageAccount: "Manage Account",
			restorePurchases: "Restore purchases",
			alertTitle: "Manage Account",
			alertMessage: "Please wait a moment",
			ok: "OK",
		},
		profile: {
			title: "Profile",
			fullName: "Full Name",
			fullNamePlaceholder: "Your full name",
			email: "Email",
			emailPlaceholder: "you@email.com",
			dob: "Date of Birth",
			updatePassword: "Update Password",
			deleteAccount: "Delete Account",
			save: "Save Changes",
		},
		refinement: {
			title: "Refinamento",
			nameLabel: "How should I call you?",
			namePlaceholder: "Your name or nickname",
			genderLabel: "Sex",
			genderPlaceholder: "Select an option",
			genderMale: "Male",
			genderFemale: "Female",
			genderOther: "Other",
			workLabel: "Work/Study/Interests",
			workPlaceholder:
				"Ex: Software Development, Marketing, Arts... (Max 250 chars)",
			aboutLabel: "Tell me more about yourself",
			aboutPlaceholder:
				"Share a bit about your routine, goals, or ideas... (Max 600 chars)",
			styleLabel: "How would you like me to work with you",
			stylePlaceholder:
				"Ex: Be direct, use analogies, explain step-by-step... (Max 600 chars)",
			save: "Save",
			skip: "Skip for now",
		},
		memory: {
			title: "Memory",
			factsTitle: "Fact Memory",
			timelineTitle: "Timeline",
			factsDescription:
				"Allow Zane to remember relevant content from dialogs. These contents will be used dynamically to remind Zane of important facts.",
			timelineDescription:
				"Allow Zane to create a timeline of your interactions. Zane uses this to understand project chronology and compare past events.",
			timelineWarning:
				"The timeline cannot be modified item by item, but you can disable or delete the entire history.",
			enableMemory: "Enable Memory",
			enableTimeline: "Enable Timeline",
			deleteTimeline: "Delete Timeline",
			deleteConfirm: "This will erase all event history. Are you sure?",
			emptyMemory: "No memories saved yet.",
			mockTime1: "11/23/2025",
			mockItem1a: "rust backend and supabase",
			mockItem1b: "Interior design with autocad",
			mockItem1c: "Creating invitations for 11-year-old daughter's birthday.",
			mockTime2: "11/22/2025",
			mockItem2a: "Chronic problems of BYD Song Pro",
			mockItem2b: "Who came first, the chicken or the egg?",
			mockTime3: "11/20/2025",
			mockItem3a: "Creating a draft for legal proceedings",
			mockTime7Days: "Last 7 days",
			mockTime30Days: "Last 30 days",
			mockTimeYear: "Last Year",
		},
		notifications: {
			title: "Notifications",
			responses: "Zane Responses",
			responsesDesc: "Get notified when Zane finishes a task",
			news: "News",
			newsDesc: "Get first-hand notifications about Zane updates",
		},
		privacy: {
			title: "Privacy & Security",
			sectionData: "Data & AI",
			modelTraining: "Model Training",
			modelTrainingDesc: "Allow anonymous interactions to help improve Zane.",
			retention: "Data Retention",
			retentionPlaceholder: "Select period",
			retentionIndefinite: "Indefinite",
			retention1Year: "1 Year",
			retention30Days: "30 Dias",
			sectionSecurity: "Security",
			biometric: "Biometric Lock",
			biometricDesc: "Require FaceID/TouchID to open",
			safeSearch: "Safe Content Filter",
			safeSearchDesc: "Hide sensitive or unsafe content",
			sectionRights: "Your Data",
			exportData: "Request my data",
			exportDesc: "We will send a JSON file to your email.",
			alertExportTitle: "Request Received",
			alertExportMsg:
				"The download link will be sent to your email within 24h.",
		},
		system: {
			title: "System & Diagnostics",
			desc: "Advanced tools for verifying system integrity.",
			runTests: "Run Backend Verification",
			running: "Running tests...",
			success: "System Operational",
			fail: "System Failure",
			consoleTitle: "Execution Log",
		},
		models: {
			mini: "Search (Google Grounding) and quick tasks",
			solo: "Ultra-fast responses (Lite)",
			pro: "Complex reasoning and long tasks",
			ultra: "Image Generation (1K/2K/4K) and Editing",
			selectModel: "Select Model",
			close: "Close",
			heroTitle: "Pick the best brain for this session",
			heroSubtitle:
				"Every model shares the same memory and safeguards. Switch without disrupting your flow.",
			activeLabel: "Active model",
			cta: "Open model guide",
		},
		modelsMeta: {
			mini: {
				tier: "Lite",
				contextWindow: "Ctx 64k",
				latency: "Latency ~0.6s",
				bestFor: "Quick flows, search and everyday tasks.",
			},
			solo: {
				tier: "Solo",
				contextWindow: "Ctx 128k",
				latency: "Latency ~0.9s",
				bestFor: "Focused chats with a bit more context.",
			},
			pro: {
				tier: "Pro",
				contextWindow: "Ctx 256k",
				latency: "Latency ~1.2s",
				bestFor: "Structured reasoning, reviews and long-form plans.",
			},
			ultra: {
				tier: "Ultra",
				contextWindow: "Ctx 256k + Images",
				latency: "Latency ~1.5s",
				bestFor:
					"Multimodal workflows, high-fidelity visuals and detailed edits.",
			},
		},
		modelsBadges: {
			recommended: "Recommended",
			balanced: "Balanced",
			flagship: "Flagship",
			creative: "Creative",
		},
		reasoning: {
			title: "Reasoning Level",
			soft: "Fast and direct",
			medium: "Balanced",
			max: "Deep analysis",
			off: "Reasoning Disabled",
			offDescription: "Reasoning disabled",
		},
		message: {
			copy: "Copy response",
			copied: "Copied!",
			like: "Like",
			dislike: "Dislike",
			retry: "Try again",
			tokenUsage: "View token usage",
			sources: "Sources consulted",
		},
		emptyState: {
			chat: {
				title: "Hello! How can I help?",
				subtitle: "Ask a question to get started",
			},
			photo: {
				title: "Zane Photo Studio",
				subtitle:
					"Imagine, describe and create. Use the power of Zane to bring your ideas to life.",
				subtitleWithModel:
					"Imagine, describe and create. Harness the power of {{model}} to bring your ideas to life.",
			},
			doc: {
				title: "Zane Doc",
				subtitle: "Upload text or code documents and chat with them.",
			},
			canvas: {
				title: "Zane Canvas",
				subtitle:
					"A dedicated space for building ideas, long-form writing and complex projects.",
			},
		},
		modes: {
			chat: {
				title: "Chats",
				description:
					"Run strategic conversations, review deliveries with agents, and keep decisions aligned.",
				action: "Open Chats",
				meta: "Reasoning + Grounding",
			},
			photo: {
				title: "Zane Photo",
				description:
					"Describe scenes to generate 1K/2K/4K images with contextual editing and quick refinements.",
				action: "Go to Photo",
				meta: "1K/2K/4K Output",
			},
			doc: {
				title: "Zane Doc",
				description:
					"Upload technical docs, code, or contracts and keep a dialogue with the files.",
				action: "Open Doc",
				meta: "Upload + Insights",
			},
			canvas: {
				title: "Zane Canvas",
				description:
					"Structure complex projects with a persistent workspace and collaborative blocks.",
				action: "Explore Canvas",
				meta: "Living Workspace",
			},
		},
		photoView: {
			toolbarTitle: "Zane Photo Studio",
			toolbarDescription:
				"Describe styles, lighting and textures. Zane adapts the visual model in real time.",
			ratioLabel: "Active ratio",
			ratioAction: "Change",
			galleryCta: "Open gallery",
			enhancerLocked: "Available on Lite and Pro models",
			enhancerReady: "Spark ready to refine",
		},
		canvasView: {
			reasoningTitle: "Reasoning in progress",
			reasoningSubtitle:
				"Zane Canvas is crafting the execution plan before generating the artifact.",
		},
	},
};

/**
 * Detecta o idioma preferido do navegador
 * Retorna 'pt-BR' se o idioma for português, caso contrário 'en-US'
 */
export function detectBrowserLanguage(): Language {
	if (typeof window === "undefined") {
		return "pt-BR";
	}

	const browserLang = navigator.language || navigator.languages?.[0];

	if (browserLang?.startsWith("pt")) {
		return "pt-BR";
	}

	return "en-US";
}

/**
 * Chave do localStorage para persistir o idioma
 */
export const LANGUAGE_STORAGE_KEY = "zane-language";

/**
 * Obtém o idioma salvo no localStorage
 */
export function getSavedLanguage(): Language | null {
	if (typeof window === "undefined") {
		return null;
	}

	const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
	if (saved === "pt-BR" || saved === "en-US") {
		return saved;
	}

	return null;
}

/**
 * Salva o idioma no localStorage
 */
export function saveLanguage(language: Language): void {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
