import { FaHeart } from "react-icons/fa6";

const Heart = ({ selected = false, onSelect = f => f, handleDoubleClick = r => r }) => (
    <FaHeart onClick={onSelect} onDoubleClick={handleDoubleClick} className={`${selected ? 'text-red-400' : 'text-zinc-300 dark:text-zinc-900'} ml-0.5 text-xl`} />
);

export default Heart;