import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, fetchingImagesPending, makeChunks, selectedImages, TAGS } from '../../shared';
import Spinner from '../../spinner.svg';
import { ImageCard } from '../image-card/ImageCard';

export function Favs(): ReactElement {
    const dispatch = useDispatch();
    const imagesLoadingState = useSelector(fetchingImagesPending);

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
                {imagesLoadingState && <img src={Spinner} alt="Loading Spinner" />}
            </div>
        </section>
    );
}
