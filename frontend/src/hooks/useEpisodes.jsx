import { useState, useEffect } from 'react';

const useEpisodes = () => {
    const baseUrl = 'https://rickandmortyapi.com/api/episode/?page=1';
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchEpisodes() {
            let totalResponse = [];
            let nextPageUrl = baseUrl;
            let data;
            setLoading(true);

            try {
                while (nextPageUrl) {
                    let res = await fetch(nextPageUrl);
                    if (!res.ok) {
                        setError('Encountered HTTP Error when fetching episodes');
                    }

                    data = await res.json();
                    totalResponse = totalResponse.concat(data.results);
                    nextPageUrl = data.info.next;
                }
                setEpisodes(totalResponse);
            } catch (error) {
                setError(`Encountered Error '${error}' when fetching episodes`);
            } finally {
                setLoading(false);
            }
        }

        fetchEpisodes();
    }, []);

    return { episodes, loading, error};
}

export default useEpisodes;