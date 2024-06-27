// import { useState, useEffect } from 'react';
// import EpisodeCard from '../components/EpisodeCard';
    
// function Episodes () {
//     const baseUrl = 'https://rickandmortyapi.com/api/episode/?page=1';
//     const [episodes, setEpisodes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Fetch characters upon mount 
//         async function fetchData() {
//             let totalResponse = [];
//             let nextPageUrl = baseUrl;
//             let data;

//             try {
//                 while (nextPageUrl != null) {
//                     let res = await fetch(nextPageUrl);
//                     if (!res.ok) {
//                         console.error('HTTP error');
//                     }

//                     data = await res.json();
//                     totalResponse = totalResponse.concat(data.results);
//                     nextPageUrl = data.info.next;
//                 }

//                 // Set fetched characters
//                 setEpisodes(totalResponse);
//                 await addCharactersSeen(totalResponse);
//             } catch (error) {
//                 console.log('Error fetching data: ', error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         // Add episode name to character object
//         async function addCharactersSeen(episodes) {
//             let newEpisodes = await Promise.all(episodes.map(async episode => {
//                 let names = [];
//                 for (let character of episode.characters) {
//                     let res = await fetch(character);
//                     let data = await res.json();
//                     let name = data.name;
//                     names.push(name);
//                 }
//                 return { ...episode, characters: names };
//             }));

//             setEpisodes(newEpisodes);
//         }

//         fetchData();
//     }, [baseUrl]);

//     return (
//         <div className='h-screen'>
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-items-center'>
//                 {episodes.map(episode => (
//                     <EpisodeCard key={episode.id} episode={episode}></EpisodeCard>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Episodes;

import { useState, useEffect } from 'react';
import EpisodeCard from '../components/EpisodeCard';

function Episodes () {
    const baseUrl = 'https://rickandmortyapi.com/api/episode/?page=1';
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

                // Set fetched episodes with character names
                setEpisodes(newEpisodes);
                console.log(episodes[0]);
                console.log(episodes[2]);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 justify-items-center m-4'>
                {episodes.map(episode => (
                    <EpisodeCard key={episode.id} episode={episode}></EpisodeCard>
                ))}
            </div>
        </div>
    );
};

export default Episodes;


