import { useState, useEffect } from 'react';
import EpisodeCard from '../components/EpisodeCard';
import SearchBar from '../components/SearchBar';

function Episodes({ season }) {
    const baseUrl = 'https://rickandmortyapi.com/api/episode/?page=1';
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

        async function fetchData() {
            let totalResponse = [];
            let nextPageUrl = baseUrl;

            try {
                while (nextPageUrl != null) {
                    let res = await fetch(nextPageUrl);
                    if (!res.ok) {
                        throw new Error('HTTP error');
                    }

                    let data = await res.json();
                    totalResponse = totalResponse.concat(data.results);
                    nextPageUrl = data.info.next;
                }

                // Add character names to episodes
                let newEpisodes = await Promise.all(totalResponse.map(async episode => {
                    let names = await Promise.all(episode.characters.map(async characterUrl => {
                        let res = await fetch(characterUrl);
                        let data = await res.json();
                        return data.name;
                    }));
                    return { ...episode, characters: names };
                }));

                // Filter episodes
                const filteredEpisodes = filterEpisodesBySeason(newEpisodes, season);
                // Set filtered episodes
                setEpisodes(filteredEpisodes);

            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [season]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='h-screen my-4'>
            <div className='grid grid-cols-1 lg-0:grid-cols-2 xl-1:grid-cols-3 gap-x-8 gap-y-2 justify-items-center m-4'>
                {episodes.map(episode => (
                    <EpisodeCard key={episode.id} episode={episode}></EpisodeCard>
                ))}
            </div>
        </div>
    );
};

export default Episodes;





