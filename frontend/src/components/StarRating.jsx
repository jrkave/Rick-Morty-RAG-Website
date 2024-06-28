import { useState } from 'react';
import Star from './Star';

const createArray = (length) => [...Array(length)];

export default function StarRating({ totalStars = 5 }) {
    const [selectedStars, setSelectedStars] = useState(0);

    return (
        <div className='flex'>
            {createArray(totalStars).map((n, i) => (
                <Star 
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => setSelectedStars(i+1)}
                    handleDoubleClick={() => setSelectedStars(0)}
                />
            ))}
        </div>
    );
}