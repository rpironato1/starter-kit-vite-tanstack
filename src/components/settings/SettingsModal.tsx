import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "@/hooks/useI18n";
import { MainView } from "./MainView";
import { MemoryFactsView } from "./MemoryFactsView";
import { MemoryMenuView } from "./MemoryMenuView";
import { MemoryTimelineView } from "./MemoryTimelineView";
import { NotificationsView } from "./NotificationsView";
import { PlanView } from "./PlanView";
import { PrivacyView } from "./PrivacyView";
import { ProfileView } from "./ProfileView";
import { RefinementView } from "./RefinementView";
import { SystemView } from "./SystemView";

export type SettingsView =
	| "main"
	| "profile"
	| "plan"
	| "privacy"
	| "notifications"
	| "system"
	| "memory"
	| "memory-facts"
	| "memory-timeline"
	| "refinement";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const { t } = useTranslation();
	const [viewStack, setViewStack] = useState<SettingsView[]>(["main"]);
	const [direction, setDirection] = useState<1 | -1>(1);

	const viewTitles = useMemo<Record<SettingsView, string>>(
		() => ({
			main: t.settings.title,
			profile: t.profile.title,
			plan: t.plan.title,
			privacy: t.privacy.title,
			notifications: t.notifications.title,
			system: t.system.title,
			memory: t.settings.memory,
			"memory-facts": t.memory.factsTitle,
			"memory-timeline": t.memory.timelineTitle,
			refinement: t.settings.refinement,
		}),
		[
			t.memory.factsTitle,
			t.memory.timelineTitle,
			t.notifications.title,
			t.plan.title,
			t.privacy.title,
			t.profile.title,
			t.settings.memory,
			t.settings.refinement,
			t.settings.title,
			t.system.title,
		],
	);

	const currentView = viewStack[viewStack.length - 1];
	const canGoBack = viewStack.length > 1;

	const pushView = useCallback((view: SettingsView) => {
		setDirection(1);
		setViewStack((stack) => [...stack, view]);
	}, []);

	const popView = useCallback(() => {
		if (viewStack.length > 1) {
			setDirection(-1);
			setViewStack((stack) => stack.slice(0, -1));
		}
	}, [viewStack.length]);

	const handleClose = useCallback(() => {
		onClose();
		setTimeout(() => setViewStack(["main"]), 300);
	}, [onClose]);

	const renderView = () => {
		const props = { pushView, popView };
		switch (currentView) {
			case "profile":
				return <ProfileView {...props} />;
			case "plan":
				return <PlanView {...props} />;
			case "privacy":
				return <PrivacyView {...props} />;
			case "notifications":
				return <NotificationsView {...props} />;
			case "system":
				return <SystemView {...props} />;
			case "memory":
				return <MemoryMenuView {...props} />;
			case "memory-facts":
				return <MemoryFactsView {...props} />;
			case "memory-timeline":
				return <MemoryTimelineView {...props} />;
			case "refinement":
				return <RefinementView {...props} />;
			default:
				return <MainView {...props} />;
		}
	};

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{ y: "100%" }}
			transition={{ type: "spring", damping: 25, stiffness: 300 }}
			className="fixed inset-0 z-[60] bg-bg-modal flex flex-col"
		>
			<header className="flex items-center justify-between p-4 pt-6 border-b border-border-default">
				<button
					type="button"
					onClick={canGoBack ? popView : handleClose}
					className="p-2 rounded-full bg-bg-hover text-text-secondary hover:text-text-primary"
				>
					{canGoBack ? (
						<ArrowLeft className="w-5 h-5" />
					) : (
						<X className="w-5 h-5" />
					)}
				</button>
				<h2 className="text-lg font-semibold text-text-primary">
					{viewTitles[currentView]}
				</h2>
				<div className="w-9 h-9" />
			</header>

			<div className="flex-1 overflow-hidden relative">
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={currentView}
						initial={{ x: `${direction * 100}%`, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: `${direction * -100}%`, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="absolute inset-0 overflow-y-auto p-4"
					>
						{renderView()}
					</motion.div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
