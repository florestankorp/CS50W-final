import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, fetchingImagesPending, imageHasErrors, makeChunks, selectedImages } from '../../shared';
import { Errors } from '../../shared/components/error/Errors';
import Spinner from '../../spinner.svg';
import { ImageCard } from '../image-card/ImageCard';
import './Home.scss';

export function Home(): ReactElement {
    const dispatch = useDispatch();
    const isLoading = useSelector(fetchingImagesPending);
    const hasErrors = useSelector(imageHasErrors);

    const images = useSelector(selectedImages);
    const chunkSize = images.length / 3 || 1;
    const imageArrayChunks = makeChunks(images, chunkSize);

    useEffect(() => {
        if (!images.length && !hasErrors) {
            dispatch(fetchImages());
        }
    });

    return (
        <section className="section">
            <div className="columns is-centered is-tablet is-multiline">
                <div className="column is-full-mobile">
                    {!images.length && <h1 className="title">No images yet...</h1>}
                    <Errors />
                    {!images.length && <p className="">...please upload a few and try again!</p>}
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
                {isLoading && <img className="" src={Spinner} alt="Loading Spinner" />}
            </div>
        </section>
    );
}
