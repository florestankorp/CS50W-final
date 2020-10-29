import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, imagesAreLoading, selectedImages } from '../shared/imageSlice';
import Spinner from '../spinner.svg';

export function Home() {
    const dispatch = useDispatch();
    const isLoading = useSelector(imagesAreLoading);

    const images = useSelector(selectedImages);
    useEffect(() => {
        if (images) {
            dispatch(fetchImages('portrait'));
        }
    }, []);

    return (
        <section className="section">
            <div className="columns is-centered">
                {images.map((image, i) => {
                    return <img src={image.secure_url} alt="" key={i} />;
                })}
                {isLoading && <img src={Spinner} alt="Loading Spinner" />}
            </div>
        </section>
    );
}
