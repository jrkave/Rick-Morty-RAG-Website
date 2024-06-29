import { useState } from 'react';
import { PiCardsBold } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import StarRating from './StarRating';

function EpisodeCard({episode}) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const toggleToolTip = () => setIsTooltipVisible(!isTooltipVisible);
      
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
        <div className='card-container bg-white dark:bg-lighter rounded-md my-2 flex flex-col justify-between w-120'>
            <div className='w-full flex flex-col relative'>
                <div>
                    <img src={`/images/ep_${episode.id}.webp`} alt={`Episode ${episode.id}`} className='rounded-md'/>
                </div>
                <div className='flex justify-between'>
                    <div className='m-1'>
                        <div className='flex items-center ml-1'>
                            <StarRating />
                            <p className='text-gray-700 dark:text-zinc-400 ml-2 '>4.5</p>
                        </div>
                        <h1 className='pt-1 ml-1 text-gray-700 dark:text-zinc-200 text-xl font-bold'>
                        {`Season ${parseEpisodeString(episode.episode).season} Episode ${parseEpisodeString(episode.episode).episode}: `}
                        <span className="dark:text-zinc-400">{`"${episode.name}"`}</span>
                        </h1>
                    </div>
                    <div>
                        <FaPlus onMouseEnter={toggleToolTip} onMouseLeave={toggleToolTip} className='mt-2 mr-2 fa-md text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:text-gray-500'/>
                        <div className={`absolute ${isTooltipVisible ? 'block' : 'hidden'} top-60 right-1 p-1 px-2 rounded-md text-sm font-semibold bg-white dark:bg-lighter dark:text-zinc-200 text-gray-700`}>
                            Add to <PiCardsBold className='inline-block'/></div>
                    </div>
                </div>
            </div>
                <div className='mx-2 mb-2'>
                    <span className='font-bold dark:text-zinc-400'>Aired on: </span>
                    <span className='dark:text-zinc-100'>{episode.air_date}</span>
                </div>
            </div>
    );
};

export default EpisodeCard;