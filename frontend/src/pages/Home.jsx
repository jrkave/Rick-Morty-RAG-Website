import { useState, useEffect } from 'react';
import useCharacters from '../hooks/useCharacters';
import useEpisodes from '../hooks/useEpisodes';
import EpisodeCard from '../components/EpisodeCard';
import CharacterCard from '../components/CharacterCard';
import { Carousel } from 'react-responsive-3d-carousel';

function Home() {
    const { episodes, loading: loadingEpisodes, error: errorEpisodes } = useEpisodes();
    const { characters, loading: loadingCharacters, error: errorCharacters } = useCharacters();

    return  (
        <div className='h-screen text-zinc-100 text-4xl font-bold font-sans m-5'>
            <EpisodeCard episode={episodes[0]}/>
            <CharacterCard character={characters[0]}/>
        </div>
    );
}

export default Home;