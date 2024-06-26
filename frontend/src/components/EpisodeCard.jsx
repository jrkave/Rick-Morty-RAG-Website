import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

function EpisodeCard({episode}) {
    const [isOpen, setIsOpen] = useState(false);
    const openDropDown = () => setIsOpen(!isOpen);

    // Parses season, episode number from 'S00EP00' format
    function parseEpisodeString(apiEpisode) {
        let season;
        let episode;

        season = apiEpisode.slice(1,3);
        episode = apiEpisode.slice(5,7);

        if (season[0] === '0') {
            season = season.slice(1);
        }
        if (episode[0] === '0') {
            episode = episode.slice(1);
        }

        let value;
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
        <div className='bg-white dark:bg-lighter rounded-md overflow-hidden m-6 w-full max-w-md relative'>
            <div>
                <img src={`images/ep_${episode.id}.webp`} className='h-64'></img>
                <div className='m-2'>
                    <h1 className='text-gray-700 dark:text-zinc-200 text-xl font-bold'>{`Season ${parseEpisodeString(episode.episode).season} Episode ${parseEpisodeString(episode.episode).episode} : `}
                        <span className='dark:text-zinc-400'>{`"${episode.name}"`}</span>
                    </h1>
                    <div className='flex justify-between items-center'>
                        <div className='text-gray-700'>
                            <span className='font-bold dark:text-amber-500'>Aired on: </span>
                            <span className='dark:text-zinc-100'>{episode.air_date}</span>
                        </div>
                        <div>
                            <FaAngleDown type='button' className='mr-1 mt-1 text-zinc-400 hover:text-zinc-200' onClick={openDropDown}/>
                        </div>
                    </div>
                    <div className={`${isOpen ? 'block' : 'hidden'} mt-2 text-gray-700`}>
                        <span className='dark:text-zinc-400 font-semibold'>Featured Characters: </span>
                        <span className='dark:text-zinc-100'>{editCharactersString(episode.characters)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;