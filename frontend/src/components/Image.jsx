import React, { useState, useEffect } from 'react';


export const Image = ({ id }) => {
    return (
        <img src={imageSrc} alt={`An image of a scene from Episode ${id}`} className='h-64 w-72' />
    );
};
