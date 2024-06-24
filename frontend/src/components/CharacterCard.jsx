import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function CharacterCard() {
    const name = 'Rick Sanchez';
    const status = 'Alive';
    const species = 'Human';
    const location = 'Earth C-137';
    const episode = 'Fear No Mort';
    const imageUrl = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

    return (
        <div className='m-6 w-72 bg-white dark:bg-lighter rounded-xl overflow-hidden'>
            <img src={imageUrl} className='mb-2'></img>
            <div className='h-52 m-4 flex flex-col justify-between'>
                <section>
                    <div className='flex'>
                        <FontAwesomeIcon className='mr-2 fa-lg mt-1 text-blue-400 dark:text-blue-300' icon={faCircleInfo}/>
                        <h1 className='text-gray-700 dark:text-zinc-100 text-xl font-bold'>{name}</h1> 
                    </div>
                    <p className='text-gray-700 dark:text-zinc-400 text-sm'>{status} - {species}</p>
                </section>
                <section>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>Last Known Location:</p>
                    <p className='text-gray-700 dark:text-zinc-100'>{location}</p>
                </section>
                <section className='mb-8'>
                    <p className='text-gray-700 dark:text-zinc-400 font-semibold'>Last Seen In:</p>
                    <p className='text-gray-700 dark:text-zinc-100'>{episode}</p>
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