import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { PiCardsBold } from 'react-icons/pi';
import HeartRating from './HeartRating';
import CircleStatus from './CircleStatus';

function CharacterCard({ character }) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const toggleToolTip = () => { setIsTooltipVisible(!isTooltipVisible) };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='card-container my-3 w-64 bg-white dark:bg-lighter rounded-xl overflow-hidden relative'>
            <div className='w-full flex flex-col'>
                <div>
                    <img src={character.image} className='mb-1 w-full h-full object-cover' alt='Character' />
                </div>
                <div className='flex justify-between'>
                    <div className='ml-2'>
                        <div className='flex items-center'>
                            <HeartRating />
                            <p className='text-gray-700 dark:text-zinc-400 ml-2'>4.5</p>
                        </div>
                        <h1 className='text-gray-700 dark:text-zinc-200 text-2xl font-bold'>{character.name}</h1>
                        <p className='text-gray-700 dark:text-zinc-400 text-sm'><CircleStatus status={character.status} />{capitalizeFirstLetter(character.status)} - {capitalizeFirstLetter(character.species)}</p>
                    </div>
                    <div>
                        <FaPlus onMouseEnter={toggleToolTip} onMouseLeave={toggleToolTip} className='mt-0.5 mr-2 fa-md text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:text-gray-500'/>
                        <div className={`absolute ${isTooltipVisible ? 'block' : 'hidden'} top-56 right-1 p-1 px-2 rounded-md text-sm font-semibold bg-white dark:bg-lighter dark:text-zinc-200 text-gray-700`}>
                        Add to <PiCardsBold className='inline-block'/></div>
                    </div>
                </div>
            </div>
            <div className='m-2 flex flex-col justify-between'>
                <div>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>Last Known Location:</p>
                    <p className='text-gray-700 dark:text-zinc-200'>{character.location.name}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>First Seen In:</p>
                    <p className='text-gray-700 dark:text-zinc-200'>{character.first_appearance}</p>
                </div>
            </div>
        </div>
    );
};


export default CharacterCard;
