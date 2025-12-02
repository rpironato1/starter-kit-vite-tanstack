import { AnimatePresence, motion } from "framer-motion";
import { Camera, FileText, Image } from "lucide-react";
import { type ComponentType, useEffect, useRef } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/lib/utils";

type AttachType = "camera" | "gallery" | "files";
type AttachLabelKey = "camera" | "photos" | "files";

interface AttachMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (type: AttachType) => void;
	className?: string;
}

interface MenuItem {
	type: AttachType;
	icon: ComponentType<{ className?: string }>;
	labelKey: AttachLabelKey;
}

const menuItems: MenuItem[] = [
	{ type: "camera", icon: Camera, labelKey: "camera" },
	{ type: "gallery", icon: Image, labelKey: "photos" },
	{ type: "files", icon: FileText, labelKey: "files" },
];

const springTransition = {
	type: "spring",
	stiffness: 400,
	damping: 30,
} as const;

export function AttachMenu({
	isOpen,
	onClose,
	onSelect,
	className,
}: AttachMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSelect = (type: AttachType) => {
		onSelect(type);
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={menuRef}
					initial={{ opacity: 0, scale: 0.9, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 10 }}
					transition={springTransition}
					className={cn(
						"absolute bottom-full mb-2 left-0 origin-bottom",
						"w-[220px] rounded-2xl p-1.5",
						"bg-bg-modal/95 backdrop-blur-xl",
						"border border-border-default",
						"shadow-2xl",
						className,
					)}
				>
					<ul className="flex flex-col gap-0.5">
						{menuItems.map(({ type, icon: Icon, labelKey }) => (
							<li key={type}>
								<button
									type="button"
									onClick={() => handleSelect(type)}
									className={cn(
										"flex w-full items-center gap-3 px-4 py-3 rounded-xl",
										"text-sm text-text-primary",
										"hover:bg-bg-hover",
										"transition-colors duration-150",
										"focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
									)}
								>
									<Icon className="size-5 text-text-secondary" />
									<span className="font-medium">{t.input[labelKey]}</span>
								</button>
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
