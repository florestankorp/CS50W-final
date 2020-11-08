import {
    faStar as starRegular,
    faThumbsUp as heartOutline,
    faTrashAlt as trashRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteImageCall,
    deleteImagePending,
    ImageProp,
    likeImagePending,
    TAGS,
    toggleLiked,
} from '../../shared/index';
import Spinner from '../../spinner.svg';
import './ImageCard.scss';
export function ImageCard({ image }: ImageProp): ReactElement {
    const [liked, setLiked] = useState(image.tags.includes(TAGS.FAV));
    const imageLikeState = useSelector(likeImagePending);
    const imageDeleteState = useSelector(deleteImagePending);

    const dispatch = useDispatch();
    const like = (public_id: string, tag: string) => {
        setLiked(!liked);
        dispatch(toggleLiked(public_id, tag));
    };
    const deleteImage = (public_id: string) => {
        dispatch(deleteImageCall(public_id));
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

                <div className="rating-container">
                    <FontAwesomeIcon icon={starRegular} size="lg" color="#FF9529" />
                    <FontAwesomeIcon icon={starRegular} size="lg" color="#FF9529" />
                    <FontAwesomeIcon icon={starRegular} size="lg" color="#FF9529" />
                    <FontAwesomeIcon icon={starRegular} size="lg" color="#FF9529" />
                    <FontAwesomeIcon icon={starRegular} size="lg" color="#FF9529" />
                </div>

                {!imageLikeState && (
                    <FontAwesomeIcon
                        onClick={() => like(image.public_id, TAGS.FAV)}
                        icon={liked ? heartSolid : heartOutline}
                        size="lg"
                        color="#1A8CC9"
                    />
                )}

                {imageLikeState && <img className="spinner" src={Spinner} alt="Loading Spinner" />}
            </div>
        </div>
    );
}
