import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, selectImageState } from '../shared/imageSlice';

export function Home() {
    const dispatch = useDispatch();

    const images = useSelector(selectImageState);
    useEffect(() => {
        if (images) {
            dispatch(fetchImages());
        }
    }, []);

    return (
        <div>
            {images.map((image, i) => {
                return <img src={image.secure_url} alt="" key={i} />;
            })}
        </div>
    );
}
