import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
    
function Characters () {
    const baseUrl = 'https://rickandmortyapi.com/api/character/?page=1';
    const [characters, setCharacters] = useState([]); // Original fetched characters 
    const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtered characters
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
                // Adds 'first_appearance' prop to characters, resets and sets characters, filteredCharacters
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

            // Reset characters with new 'first_appearance' property added
            setCharacters(newCharacters);
            // Set filtered characters as well
            setFilteredCharacters(newCharacters)
        }

        fetchData();
    }, [baseUrl]);

    const handleSearch = (query) => {
        if (!query) {
            setFilteredCharacters(characters);
        } else {
            const lowercaseQuery = query.toLowerCase();
            setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(lowercaseQuery)));
        }
    };

    return (
        <div className='h-screen my-4 mx-4'>
            <div className='flex mt-8 mb-4 w-full'>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className='grid grid-cols-1 xs-1:grid-cols-2 md-1:grid-cols-3 lg-1:grid-cols-4 xl-1:grid-cols-5 justify-items-center'>
                {filteredCharacters.map(character => (
                    <CharacterCard key={character.id} character={character}></CharacterCard>
                ))}
            </div>
        </div>
    );
};

export default Characters;