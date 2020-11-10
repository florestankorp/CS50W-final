import {
    faStar as starRegular,
    faThumbsUp as heartOutline,
    faTrashAlt as trashRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faStar as starSolid, faThumbsUp as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    COLORS,
    deleteImageCall,
    deleteImagePending,
    getRating,
    ImageProp,
    likeImagePending,
    rateImagePending,
    TAGS,
    toggleLiked,
} from '../../shared';
import Spinner from '../../spinner.svg';
import './ImageCard.scss';
export function ImageCard({ image }: ImageProp): ReactElement {
    const [rating, setRating] = useState(getRating(image.tags));
    const [liked, setLiked] = useState(image.tags.includes(TAGS.FAV));
    const imageLikeState = useSelector(likeImagePending(image.public_id));
    const imageDeleteState = useSelector(deleteImagePending(image.public_id));
    const imageRateState = useSelector(rateImagePending(image.public_id));

    const dispatch = useDispatch();
    const tag = (public_id: string, tag: string) => {
        if (tag === TAGS.FAV) {
            setLiked(!liked);
        } else {
            // enable zero stars rating by toggling one star
            rating === 1 ? setRating(0) : setRating(getRating([tag]));
        }

        dispatch(toggleLiked(public_id, tag));
    };
    const deleteImage = (public_id: string) => {
        dispatch(deleteImageCall(public_id));
    };

    const ratingIcon = (index: number) => {
        const icon = rating >= index ? starSolid : starRegular;

        return (
            <FontAwesomeIcon
                key={index}
                onClick={() => tag(image.public_id, `rate:${index}`)}
                icon={icon}
                size="lg"
                color={COLORS.GOLD}
            />
        );
    };

    return (
        <div className="card mb-5 portfolio-item">
            <div className="card-image">
                <img className="image" src={image.secure_url} alt="" />
            </div>
            <div className="card-button-container">
                {!imageDeleteState && (
                    <FontAwesomeIcon
                        onClick={() => deleteImage(image.public_id)}
                        icon={trashRegular}
                        size="lg"
                        color="#FF4545"
                    />
                )}

                {imageDeleteState && <img className="spinner" src={Spinner} alt="Loading Spinner" />}

                {!imageRateState && (
                    <div className="rating-container">
                        {[...Array(5)].map((x, i) => {
                            return ratingIcon(i + 1);
                        })}
                    </div>
                )}

                {imageRateState && <img className="spinner" src={Spinner} alt="Loading Spinner" />}

                {!imageLikeState && (
                    <FontAwesomeIcon
                        onClick={() => tag(image.public_id, TAGS.FAV)}
                        icon={liked ? heartSolid : heartOutline}
                        size="lg"
                        color={COLORS.BLUE}
                    />
                )}

                {imageLikeState && <img className="spinner" src={Spinner} alt="Loading Spinner" />}
            </div>
        </div>
    );
}
