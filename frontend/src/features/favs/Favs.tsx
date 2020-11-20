import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, fetchingImagesPending, imageHasErrors, makeChunks, selectedImages, TAGS } from '../../shared';
import { Errors } from '../../shared/components/error/Errors';
import Spinner from '../../spinner.svg';
import { ImageCard } from '../image-card/ImageCard';

export function Favs(): ReactElement {
    const dispatch = useDispatch();
    const imagesLoadingState = useSelector(fetchingImagesPending);
    const hasErrors = useSelector(imageHasErrors);

    const images = useSelector(selectedImages);
    const favs = images.filter((image) => image.tags.includes(TAGS.FAV));
    const chunkSize = favs.length / 3 || 1;
    const imageArrayChunks = makeChunks(favs, chunkSize);

    useEffect(() => {
        if (!favs.length && !hasErrors) {
            dispatch(fetchImages(TAGS.FAV));
        }
    }, []);

    return (
        <section className="section">
            <div className="columns is-centered is-tablet is-multiline">
                <div className="column is-full-mobile">
                    {!favs.length && <h1 className="title">No favs yet...</h1>}
                    <Errors />
                    {!favs.length && <p>...please like a few images try again!</p>}
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
