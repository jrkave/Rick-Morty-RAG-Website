import { useEffect, useState } from 'react';

const useCharacters = () => {
    const baseUrl = 'https://rickandmortyapi.com/api/character/?page=1';
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch original characters
    useEffect(() => {
        async function fetchCharacters() {
            let totalResponse = [];
            let nextPageUrl = baseUrl;
            let data;
            setLoading(true);

            try {
                while (nextPageUrl) {
                    let res = await fetch(nextPageUrl);
                    if (!res.ok) {
                        setError('Encountered HTTP Error when fetching characters');
                    }

                    data = await res.json();
                    totalResponse = totalResponse.concat(data.results);
                    nextPageUrl = data.info.next;
                }
                setCharacters(totalResponse);
            } catch (error) {
                setError(`Encountered Error '${error.message}' when fetching characters`);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacters();
    }, [])

    // Fetch episode appearances of characters
    useEffect(() => {
        async function fetchEpisodeAppearance(characters) {
            let res;
            let data;
            let episodeName;
            setLoading(true);
            
            try { 
                let editedCharacters = await Promise.all(characters.map(async character => {
                    try {
                        res = await fetch(character.episode[0]);
                        if (!res.ok) {
                            setError('Encountered HTTP Error when fetching first episode appearances');
                        }
        
                        data = await res.json();
                        episodeName = data.name;
        
                        return { ...character, first_appearance: episodeName};
                    } catch (error) {
                        setError(`Encountered Error '${error}' when fetching first episode appearances`);
                        return character; // Return character without first_appearance if error 
                    }
                }));
        
                setCharacters(editedCharacters);
            } catch (error) {
                setError(`Encountered Error '${error}' when fetching first episode appearances`);
            } finally {
                setLoading(false);
            }
        }

        if (characters.length > 0) { 
            fetchEpisodeAppearance(characters);
        }
    }, []);

    return { characters, loading, error };
};

export default useCharacters;