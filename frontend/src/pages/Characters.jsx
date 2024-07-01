import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import useCharacters from '../hooks/useCharacters';

function Characters () {
    const { characters, loading, error } = useCharacters(); 
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    useEffect(() => {
        setFilteredCharacters(characters);
    }, [characters]);

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