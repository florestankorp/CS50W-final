/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';
import { LIKE_URL, LIST_URL } from '../constants';
import { Image, ImageState } from '../models';
import { RootState } from './store';

const initialState: ImageState = {
    images: [],
    isLoading: false,
    error: '',
};

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        fetchImagesStart: (state: ImageState) => {
            state.isLoading = true;
        },
        fetchImagesSuccess: (state: ImageState, { payload }) => {
            state.isLoading = false;
            state.error = '';
            state.images = payload.data.resources;
        },
        fetchImagesFailure: (state: ImageState, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        likeImageStart: (state: ImageState) => {
            state.isLoading = true;
        },
        likeImageSuccess: (state: ImageState) => {
            state.isLoading = false;
            state.error = '';
        },
        likeImageFailure: (state: ImageState, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        toggleLikedAction: (state: ImageState, { payload }) => {
            const { public_id, tag } = payload;
            const likedImage = state.images.find((image) => image.public_id === public_id);
            const index = likedImage?.tags.indexOf(tag) || 0;

            index > -1 ? likedImage?.tags.splice(index, 1) : likedImage?.tags.push(tag);
        },
    },
});

export const {
    fetchImagesStart,
    fetchImagesSuccess,
    fetchImagesFailure,
    likeImageStart,
    likeImageSuccess,
    likeImageFailure,
    toggleLikedAction,
} = imageSlice.actions;

export const selectedImages = (state: RootState): Image[] => state.image.images;
export const imagesAreLoading = (state: RootState): boolean => state.image.isLoading;

export default imageSlice.reducer;

// no tag fetches all images
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetchImages(tag?: string) {
    const encodedValue = tag ? encodeURIComponent(tag) : '';
    const param = encodedValue ? `?tag=${encodedValue}` : '';

    return async (dispatch) => {
        dispatch(fetchImagesStart);

        try {
            const response = await fetch(`${LIST_URL}${param}`);
            const data = await response.json();
            if (response.ok) {
                dispatch(fetchImagesSuccess(data));
            } else {
                const key = Object.keys(data)[0];
                const message = data[key] ? data[key][0] : response.statusText;
                throw Error(message);
            }
        } catch (error) {
            dispatch(fetchImagesFailure(error.message));
        }
    };
}

export function toggleLiked(public_id: string, tag: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (dispatch) => {
        dispatch(likeImageStart);

        try {
            const response = await fetch(LIKE_URL, {
                method: 'PUT',
                body: JSON.stringify({ public_id, tag }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(likeImageSuccess);
                dispatch(toggleLikedAction({ public_id, tag }));
            } else {
                const key = Object.keys(data)[0];
                const message = data[key] ? data[key][0] : response.statusText;
                throw Error(message);
            }
        } catch (error) {
            dispatch(likeImageFailure(error.message));
        }
    };
}
