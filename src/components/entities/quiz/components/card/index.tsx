import { FC } from 'react';
import { Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IQuizCard {
	active: boolean;
	onClick: () => void;
	label: string;
	desc?: string;
	details?: string[];
}

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ');

const QuizCard: FC<IQuizCard> = ({ active, onClick, label, desc, details }) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className={cx(
				'w-full text-left p-4 rounded-2xl border transition shadow-sm cursor-pointer',
				active ? 'text-white' : 'border-neutral-200 hover:border-neutral-400',
			)}
			style={
				active ? { backgroundColor: '#0B29FF', borderColor: '#0B29FF' } : {}
			}
		>
			<div className="font-medium flex items-center gap-2">
				{active ? <Check size={18} /> : <Info size={18} />}
				{label}
			</div>
			{desc && (
				<div
					className={cx(
						'mt-1 text-sm',
						active ? 'text-white/80' : 'text-neutral-600',
					)}
				>
					{desc}
				</div>
			)}
			<AnimatePresence>
				{active && details && (
					<motion.ul
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="mt-3 pl-5 space-y-1 text-sm list-disc text-white/90"
					>
						{details.map((d) => (
							<li key={d}>{d}</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</button>
	);
};

export default QuizCard;
