import { AnimatePresence, motion } from "framer-motion";
import { Download, Image as ImageIcon, X } from "lucide-react";

interface ZaneGalleryProps {
	isOpen: boolean;
	onClose: () => void;
	images?: string[];
}

// Mock images for demo
const MOCK_IMAGES = [
	"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60",
	"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60",
];

export function ZaneGallery({ isOpen, onClose, images }: ZaneGalleryProps) {
	const galleryImages = images?.length ? images : MOCK_IMAGES;

	const handleDownload = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="absolute inset-0 z-50 flex items-end justify-center">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Bottom Sheet */}
					<motion.div
						variants={{
							hidden: { y: "100%" },
							visible: { y: 0 },
						}}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="relative flex h-[85%] w-full flex-col overflow-hidden rounded-t-[32px] bg-bg-modal"
					>
						{/* Header */}
						<div className="flex shrink-0 items-center justify-between border-b border-border-default p-4">
							<div className="flex items-center gap-2">
								<div className="rounded-lg bg-accent-primary/20 p-1.5">
									<ImageIcon className="h-4 w-4 text-accent-primary" />
								</div>
								<span className="font-semibold text-text-primary">
									Galeria Zane
								</span>
								<span className="text-xs text-text-secondary">
									{galleryImages.length} imagens
								</span>
							</div>
							<button
								type="button"
								onClick={onClose}
								title="Fechar galeria"
								className="rounded-full p-2 text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Grid */}
						<div className="flex-1 overflow-y-auto p-1">
							<div className="grid grid-cols-3 gap-0.5">
								{galleryImages.map((src) => (
									<div
										key={src}
										className="group relative aspect-square cursor-pointer overflow-hidden"
									>
										<img
											src={src}
											alt="Conteúdo da galeria"
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										{/* Hover Overlay */}
										<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
											<button
												type="button"
												onClick={() => handleDownload(src)}
												title="Baixar imagem"
												className="rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-transform hover:scale-110"
											>
												<Download className="h-6 w-6" />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
