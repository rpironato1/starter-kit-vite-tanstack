import { ChevronDown, ImageIcon } from "lucide-react";
import { useState } from "react";
import {
	type AspectRatio,
	AspectRatioSelector,
} from "@/components/selectors/AspectRatioSelector";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

interface PhotoToolbarProps {
	currentModel: string;
	aspectRatio: AspectRatio;
	onAspectRatioChange: (ratio: AspectRatio) => void;
	onOpenGallery: () => void;
}

export function PhotoToolbar({
	currentModel,
	aspectRatio,
	onAspectRatioChange,
	onOpenGallery,
}: PhotoToolbarProps) {
	const { t } = useTranslation();
	const [ratioMenuOpen, setRatioMenuOpen] = useState(false);

	return (
		<section className="border-b border-border-default/40 bg-bg-main/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
				<div className="space-y-2 text-left">
					<p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-secondary">
						{t.photoView.toolbarTitle}
					</p>
					<p className="font-serif text-2xl text-text-primary">
						{t.photoView.toolbarDescription}
					</p>
					<p className="text-sm text-text-secondary">
						{t.models.activeLabel}:{" "}
						<span className="text-text-primary">{currentModel}</span>
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<div className="relative w-full min-w-[220px] rounded-3xl border border-border-default/60 bg-bg-surface/70 px-4 py-3 text-left shadow-lg shadow-black/10 sm:w-auto">
						<p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-text-secondary">
							{t.photoView.ratioLabel}
						</p>
						<button
							type="button"
							onClick={() => setRatioMenuOpen((prev) => !prev)}
							className="mt-1 flex w-full items-center justify-between rounded-2xl border border-border-default/40 bg-bg-main/70 px-3 py-2 text-lg font-semibold text-text-primary"
							aria-expanded={ratioMenuOpen}
							aria-haspopup="dialog"
						>
							<span>{aspectRatio}</span>
							<div className="flex items-center gap-2 text-xs text-text-secondary">
								{t.photoView.ratioAction}
								<ChevronDown
									className={cn(
										"h-4 w-4 transition-transform duration-200",
										ratioMenuOpen && "rotate-180",
									)}
								/>
							</div>
						</button>

						{ratioMenuOpen && (
							<>
								<button
									type="button"
									className="fixed inset-0 z-10 cursor-default"
									onClick={() => setRatioMenuOpen(false)}
									aria-label="Fechar seleção de proporção"
								/>
								<div className="absolute right-0 top-full z-20 mt-3 w-full min-w-[220px] rounded-2xl border border-border-default/60 bg-bg-modal/95 p-3 shadow-2xl backdrop-blur-xl">
									<AspectRatioSelector
										value={aspectRatio}
										onChange={(ratio) => {
											onAspectRatioChange(ratio);
											setRatioMenuOpen(false);
										}}
									/>
								</div>
							</>
						)}
					</div>

					<button
						type="button"
						onClick={onOpenGallery}
						className="inline-flex items-center gap-2 rounded-3xl border border-border-default/70 bg-bg-surface/70 px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent-primary/40"
					>
						<ImageIcon className="h-4 w-4 text-accent-primary" />
						{t.photoView.galleryCta}
					</button>
				</div>
			</div>
		</section>
	);
}
