import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className='w-full'>
            <input
                type='text'
                placeholder='Search...'
                value={query}
                onChange={handleInputChange}
                className='p-3 w-full bg-white dark:bg-lighter border dark:border-zinc-600 text-gray-700 dark:text-white font-semibold rounded-3xl placeholder-gray-400 dark:placeholder-zinc-500'
            />
        </div>
    );
}

export default SearchBar;