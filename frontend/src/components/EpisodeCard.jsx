import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import StarRating from './StarRating';

function EpisodeCard({episode}) {
    const [isOpen, setIsOpen] = useState(false);
    const openDropDown = () => setIsOpen(!isOpen);
      
    function parseEpisodeString(apiEpisode) {
        // Format of apiEpisode: 'S00E00'
        let season;
        let episode;
        let value;

        season = apiEpisode.slice(1,3);
        episode = apiEpisode.slice(4,6);

        if (season[0] === '0') {
            season = season.slice(1);
        } else if (season[1] === '1') {
            season = season.slice(1, 3);
        }

        if (episode[0] === '0') {
            episode = episode.slice(1);
        } else if (episode[1] === '1') {
            episode = episode.slice(0, 2);
        }
        
        value = {
            'season': season,
            'episode': episode,
        };

        return value;
    }

    function editCharactersString(charactersSeen) {
        return charactersSeen.join(', ');
    }

    return (
        <div className='container bg-white dark:bg-lighter rounded-md m-2 flex flex-col justify-between'>
            <div>
                <img src={`/images/ep_${episode.id}.webp`} alt={`Episode ${episode.id}`} className='rounded-md' />
                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center ml-2'>
                        <StarRating />
                        <p className='text-gray-700 dark:text-zinc-400 ml-2'>4.5</p>
                    </div>
                    <FaPlus className='mr-2 text-gray-700 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-zinc-200 fa-md' />
                </div>
                <h1 className='mx-2 pt-1 text-gray-700 dark:text-zinc-200 text-xl font-bold'>
                    {`Season ${parseEpisodeString(episode.episode).season} Episode ${parseEpisodeString(episode.episode).episode}: `}
                    <span className="dark:text-zinc-400">{`"${episode.name}"`}</span>
                </h1>
            </div>
            <div className='flex justify-between items-center mt-4 px-2 pb-1 relative'>
                <div className='text-gray-700 mb-2'>
                    <span className='font-bold dark:text-amber-500'>Aired on: </span>
                    <span className='dark:text-zinc-100'>{episode.air_date}</span>
                </div>
                <div>
                    <FaAngleDown
                        type='button'
                        className='text-gray-700 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-zinc-200 fa-md'
                        onClick={openDropDown}
                    />
                </div>
                <div className={`${isOpen ? 'block' : 'hidden'} text-gray-700 absolute left-0 top-7 bg-white dark:bg-lighter rounded-md pl-2 pb-2`}>
                    <span className='dark:text-amber-500 font-semibold'>Featured Characters: </span>
                    <span className='dark:text-zinc-100'>{editCharactersString(episode.characters)}</span>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;