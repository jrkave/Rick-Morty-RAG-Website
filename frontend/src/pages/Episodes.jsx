import { useState, useEffect } from 'react';
import EpisodeCard from '../components/EpisodeCard';

function Episodes () {
    const baseUrl = 'https://rickandmortyapi.com/api/episode/?page=1';
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch episodes upon mount 
        async function fetchData() {
            let totalResponse = [];
            let nextPageUrl = baseUrl;
            let data;

            try {
                while (nextPageUrl != null) {
                    let res = await fetch(nextPageUrl);
                    if (!res.ok) {
                        console.error('HTTP error');
                    }

                    data = await res.json();
                    totalResponse = totalResponse.concat(data.results);
                    nextPageUrl = data.info.next;
                }

                // Set fetched episodes
                setEpisodes(totalResponse);
                await addCharactersSeen(totalResponse);
            } catch (error) {
                console.log('Error fetching data: ', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        // Add characters seen in episode to episode object
        async function addCharactersSeen(episodes) {
            let newEpisodes = await Promise.all(episodes.map(async episode => {
                let names = [];
                for (character of episode.characters) {
                    let res = await fetch(character);
                    let data = await res.json();
                    let name = data.name;
                    names.push(name);
                }
                return { ...episode, characters: names };
            }));

            setEpisodes(newEpisodes);
        }

        fetchData();
    }, [baseUrl]);

    return (
        <div className='h-screen'>
            <EpisodeCard />
        </div>
    );
};

export default Episodes;