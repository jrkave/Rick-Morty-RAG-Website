import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
    
function Characters () {
    const baseUrl = 'https://rickandmortyapi.com/api/character/?page=1';
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch characters upon mount 
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

                // Set fetched characters
                setCharacters(totalResponse);
                await addFirstSeen(totalResponse);
            } catch (error) {
                console.log('Error fetching data: ', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        // Add episode name to character object
        async function addFirstSeen(characters) {
            let newCharacters = await Promise.all(characters.map(async character => {
                let res = await fetch(character.episode[0]);
                let data = await res.json();
                let name = data.name;
                return { ...character, first_appearance: name };
            }));

            setCharacters(newCharacters);
        }

        fetchData();
    }, [baseUrl]);

    return (
        <div className='h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center'>
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character}></CharacterCard>
                ))}
            </div>
        </div>
    );
};

export default Characters;