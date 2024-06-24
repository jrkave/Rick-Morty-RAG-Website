import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import CircleStatus from './CircleStatus';

function CharacterCard({ character }) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='my-6 w-72 bg-white dark:bg-lighter rounded-xl overflow-hidden'>
            <img src={character.image} className='mb-2'></img>
            <div className='h-52 m-4 flex flex-col justify-between'>
                <section>
                    <div className='flex'>
                        <FontAwesomeIcon className='mr-2 fa-lg mt-1 text-blue-400 dark:text-blue-300' icon={faCircleInfo}/>
                        <h1 className='text-gray-700 dark:text-zinc-100 text-xl font-bold'>{character.name}</h1> 
                    </div>
                    <p className='text-gray-700 dark:text-zinc-400 text-sm'><CircleStatus status={character.status} />{capitalizeFirstLetter(character.status)} - {capitalizeFirstLetter(character.species)}</p>
                </section>
                <section>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>Last Known Location:</p>
                    <p className='text-gray-700 dark:text-zinc-100'>{character.location.name}</p>
                </section>
                <section className='mb-8'>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>First Seen In:</p>
                    <p className='text-gray-700 dark:text-zinc-100'>{character.first_appearance}</p>
                </section>
            </div>
            <div className='flex mx-4 pb-4 border-t-2 dark:border-zinc-600 pt-4'>
                <FontAwesomeIcon className='fa-button fa-lg mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:dark:text-amber-500' icon={faThumbsUp} role='button'/>
                <FontAwesomeIcon className='fa-button fa-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:dark:text-amber-500' icon={faComment} role='button'/>
            </div>
        </div>
    );
}

export default CharacterCard;