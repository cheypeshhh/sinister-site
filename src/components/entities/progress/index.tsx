import { FC } from 'react';

interface IProgress {
	step: number;
	total: number;
}

const Progress: FC<IProgress> = ({ step, total }) => {
	const computeProgress = (step: number, total: number): number => {
		if (total <= 0) return 0;
		const pct = Math.round(((step + 1) / total) * 100);
		return Math.max(0, Math.min(100, pct));
	};

	const pct = computeProgress(step, total);

	return (
		<div>
			<div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
				<span>
					Step {step + 1} of {total}
				</span>
				<span>{pct}%</span>
			</div>
			<div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
				<div
					className="h-full rounded-full"
					style={{ width: `${pct}%`, backgroundColor: '#0B29FF' }}
				/>
			</div>
		</div>
	);
};

export default Progress;
