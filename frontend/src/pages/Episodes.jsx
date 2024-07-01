import { useState, useEffect } from 'react';
import useEpisodes from '../hooks/useEpisodes';
import EpisodeCard from '../components/EpisodeCard';

function Episodes({ season }) {
    const { episodes, loading, error } = useEpisodes(); 
    const [filteredEpisodes, setFilteredEpisodes] = useState([]);

    useEffect(() => {
        const filterEpisodesBySeason = (episodes, season) => {
            if (!season) return episodes;

            const seasonRanges = {
                1: [1, 11],
                2: [12, 21],
                3: [22, 31],
                4: [32, 41],
                5: [42, 51]
            };
    
            const [start, end] = seasonRanges[season];
            return episodes.filter(episode => (episode.id >= start && episode.id <= end));
        };

        setFilteredEpisodes(filterEpisodesBySeason(episodes, season));
    }, [episodes, season]);

    return (
        <div className='h-screen my-4'>
            <div className='grid grid-cols-1 lg-0:grid-cols-2 xl-1:grid-cols-3 gap-x-8 gap-y-2 justify-items-center m-4'>
                {filteredEpisodes.map(episode => (
                    <EpisodeCard key={episode.id} episode={episode}></EpisodeCard>
                ))}
            </div>
        </div>
    );
};

export default Episodes;





