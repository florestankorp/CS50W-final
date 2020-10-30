import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, imagesAreLoading, selectedImages } from '../../shared/imageSlice';
import Spinner from '../../spinner.svg';
import './Home.scss';

export function Home() {
    const dispatch = useDispatch();
    const isLoading = useSelector(imagesAreLoading);

    const images = useSelector(selectedImages);
    const chunkSize = images.length / 3;
    console.log(chunkSize);

    const imageArrayChunks = makeChunks(images, chunkSize);

    useEffect(() => {
        if (images) {
            // dispatch(fetchImages('portrait'));
            dispatch(fetchImages());
        }
    }, []);

    return (
        <section className="section">
            <div className="columns is-centered is-tablet is-multiline">
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[0] &&
                        imageArrayChunks[0].map((image, i) => {
                            return (
                                <div className="card mb-5 portfolio-item">
                                    <div className="card-image">
                                        <img className="image" src={image.secure_url} alt="" />
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[1] &&
                        imageArrayChunks[1].map((image, i) => {
                            return (
                                <div className="card mb-5 portfolio-item">
                                    <div className="card-image">
                                        <img className="image" src={image.secure_url} alt="" />
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="column is-full-mobile">
                    {imageArrayChunks &&
                        imageArrayChunks[2] &&
                        imageArrayChunks[2].map((image, i) => {
                            return (
                                <div className="card mb-5 portfolio-item">
                                    <div className="card-image">
                                        <img className="image" src={image.secure_url} alt="" />
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {isLoading && <img src={Spinner} alt="Loading Spinner" />}
            </div>
        </section>
    );
}

function makeChunks(images: any[], chunkSize: number): any[] {
    let arr: any[] = [];

    for (let index = 0; index < images.length; index += chunkSize) {
        arr.push(images.slice(index, index + chunkSize));
    }

    return arr;
}
