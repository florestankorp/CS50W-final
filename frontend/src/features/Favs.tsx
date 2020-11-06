import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, imagesAreLoading, makeChunks, selectedImages, TAGS } from '../shared/index';
import Spinner from '../spinner.svg';
import { ImageCard } from './home/ImageCard';

export function Favs(): ReactElement {
    const dispatch = useDispatch();
    const isLoading = useSelector(imagesAreLoading);

    const images = useSelector(selectedImages);
    const favs = images.filter((image) => image.tags.includes(TAGS.FAV));
    const chunkSize = favs.length / 3 || 1;
    const imageArrayChunks = makeChunks(favs, chunkSize);

    useEffect(() => {
        if (!favs.length) {
            dispatch(fetchImages(TAGS.FAV));
        }
    }, []);

    return (
        <section className="section">
            <div className="columns is-centered is-tablet is-multiline">
                {!favs.length && <h1 className="title has-text-centered">No favs yet...</h1>}
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
