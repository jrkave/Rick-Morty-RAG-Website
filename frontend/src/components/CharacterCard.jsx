import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from 'react-icons/fa6';
import CircleStatus from './CircleStatus';

function CharacterCard({ character }) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='my-3 w-72 bg-white dark:bg-lighter rounded-xl overflow-hidden'>
            <div className='image-container w-full'>
                <img src={character.image} className='mb-1 w-full h-full object-cover'></img>
            </div>
            <div className='h-52 ml-3 flex flex-col justify-between'>
                <section>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-gray-700 dark:text-zinc-200 text-2xl font-bold'>{character.name}</h1> 
                        </div>
                        <div>
                            <FaPlus className='mr-2 text-gray-700 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-zinc-200 fa-md' />
                        </div>
                    </div>
                    <p className='text-gray-700 dark:text-zinc-400 text-sm'><CircleStatus status={character.status} />{capitalizeFirstLetter(character.status)} - {capitalizeFirstLetter(character.species)}</p>
                </section>
                <section>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>Last Known Location:</p>
                    <p className='text-gray-700 dark:text-zinc-200'>{character.location.name}</p>
                </section>
                <section className='mb-8'>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>First Seen In:</p>
                    <p className='text-gray-700 dark:text-zinc-200'>{character.first_appearance}</p>
                </section>
            </div>
            <div className='flex items-center mx-4 pb-4 border-t-2 dark:border-zinc-600 pt-4'>
                <FontAwesomeIcon className='fa-button fa-lg mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:dark:text-amber-500' icon={faThumbsUp} role='button'/>
                <p className='text-gray-700 dark:text-zinc-400'>15</p>
            </div>
        </div>
    );
}

export default CharacterCard;