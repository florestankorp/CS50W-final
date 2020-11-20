import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { deleteImageErrors, fetchingImageErrors, likeImageErrors } from '../..';
import './Errors.scss';

export function Errors(): ReactElement {
    const likeErrors = useSelector(likeImageErrors);
    const fetchErrors = useSelector(fetchingImageErrors);
    const deleteErrors = useSelector(deleteImageErrors);

    return (
        <div>
            <p className="error">{likeErrors[0]}</p>
            <p className="error">{fetchErrors[0]}</p>
            <p className="error">{deleteErrors[0]}</p>
        </div>
    );
}
