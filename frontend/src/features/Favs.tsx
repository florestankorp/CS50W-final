import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, imagesAreLoading, selectedImages } from '../shared/imageSlice';
import { makeChunks } from '../shared/utils';
import Spinner from '../spinner.svg';
import { ImageCard } from './home/ImageCard';

export function Favs() {
    const dispatch = useDispatch();
    const isLoading = useSelector(imagesAreLoading);

    const images = useSelector(selectedImages);
    const favs = images.filter((image) => image.tags[0] === 'fav');
    const chunkSize = images.length / 3;
    const imageArrayChunks = makeChunks(favs, chunkSize);

    useEffect(() => {
        if (images) {
            dispatch(fetchImages('fav'));
        }
    }, []);

    return (
        <section className="section">
            <div className="columns is-centered is-tablet is-multiline">
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[0] &&
                        imageArrayChunks[0].map((image, i) => {
                            return <ImageCard image={image} key={i} />;
                        })}
                </div>
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[1] &&
                        imageArrayChunks[1].map((image, i) => {
                            return <ImageCard image={image} key={i} />;
                        })}
                </div>
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[2] &&
                        imageArrayChunks[2].map((image, i) => {
                            return <ImageCard image={image} key={i} />;
                        })}
                </div>
                {isLoading && <img src={Spinner} alt="Loading Spinner" />}
            </div>
        </section>
    );
}
