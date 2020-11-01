import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLiked } from '../../shared/imageSlice';

export function ImageCard({ image }: any) {
    const [liked, setLiked] = useState(image.tags.includes('fav'));

    const dispatch = useDispatch();
    const handleClick = (public_id: string, tag: string) => {
        setLiked(!liked);
        dispatch(toggleLiked(public_id, tag));
    };

    return (
        <div className="card mb-5 portfolio-item">
            <div className="card-image">
                <img className="image" src={image.secure_url} alt="" />
            </div>
            <span onClick={() => handleClick(image.public_id, 'fav')}>
                {<FontAwesomeIcon icon={liked ? heartSolid : heartOutline} size="lg" color="black" />}
            </span>
        </div>
    );
}
