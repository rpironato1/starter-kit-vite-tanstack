import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, FileText, FolderOpen, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AttachType = "camera" | "gallery" | "files" | "folder" | "link";

interface AttachMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (type: AttachType) => void;
	className?: string;
}

const menuItems: { type: AttachType; icon: typeof Camera; label: string }[] = [
	{ type: "camera", icon: Camera, label: "Tirar foto" },
	{ type: "gallery", icon: Image, label: "Escolher da galeria" },
	{ type: "files", icon: FileText, label: "Enviar arquivo" },
	{ type: "folder", icon: FolderOpen, label: "Abrir pasta" },
	{ type: "link", icon: Link2, label: "Colar link" },
];

const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

export function AttachMenu({
	isOpen,
	onClose,
	onSelect,
	className,
}: AttachMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

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
						"min-w-[200px] rounded-xl p-1.5",
						"bg-white dark:bg-zinc-800",
						"border border-zinc-200 dark:border-zinc-700",
						"shadow-lg dark:shadow-zinc-900/50",
						className,
					)}
				>
					<ul className="flex flex-col gap-0.5" role="menu">
						{menuItems.map(({ type, icon: Icon, label }) => (
							<li key={type} role="menuitem">
								<button
									type="button"
									onClick={() => handleSelect(type)}
									className={cn(
										"flex w-full items-center gap-3 px-3 py-2.5 rounded-lg",
										"text-sm text-zinc-700 dark:text-zinc-200",
										"hover:bg-zinc-100 dark:hover:bg-zinc-700",
										"transition-colors duration-150",
										"focus:outline-none focus:ring-2 focus:ring-blue-500/50",
									)}
								>
									<Icon className="size-5 text-zinc-500 dark:text-zinc-400" />
									<span>{label}</span>
								</button>
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
