import { FaStar } from "react-icons/fa6";

const Star = ({ selected = false, onSelect = f => f, handleDoubleClick = r => r }) => (
    <FaStar onClick={onSelect} onDoubleClick={handleDoubleClick} className={`${selected ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-900'} text-xl`} />
);

export default Star;