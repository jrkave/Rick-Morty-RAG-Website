import { useState } from 'react';
import Heart from './Heart';

const createArray = (length) => [...Array(length)];

export default function HeartRating({ totalHearts = 5 }) {
    const [selectedHearts, setSelectedHearts] = useState(0);

    return (
        <div className='flex'>
            {createArray(totalHearts).map((n, i) => (
                <Heart 
                    key={i}
                    selected={selectedHearts > i}
                    onSelect={() => setSelectedHearts(i+1)}
                    handleDoubleClick={() => setSelectedHearts(0)}
                />
            ))}
        </div>
    );
}