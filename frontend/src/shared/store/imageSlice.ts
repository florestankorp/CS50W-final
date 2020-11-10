/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';
import { DELETE_URL, LIST_URL, TAG_URL } from '../constants';
import { Image, ImageState } from '../models';
import { RootState } from './store';

const initialState: ImageState = {
    images: [],
    fetchingImagesPending: false,
    likeImagePendingId: '',
    deleteImagePendingId: '',
    rateImagePendingId: '',
    errors: {
        fetch: [],
        like: [],
        delete: [],
    },
};

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        fetchImagesStart: (state: ImageState) => {
            state.fetchingImagesPending = true;
        },
        fetchImagesSuccess: (state: ImageState, { payload }) => {
            state.fetchingImagesPending = false;
            state.errors.fetch = [];
            state.images = payload.data.resources;
        },
        fetchImagesFailure: (state: ImageState, { payload }) => {
            state.fetchingImagesPending = false;
            state.errors.fetch.push(payload);
        },
        likeImageStart: (state: ImageState, { payload }) => {
            state.likeImagePendingId = payload;
        },
        likeImageSuccess: (state: ImageState) => {
            state.likeImagePendingId = '';
            state.errors.like = [];
        },
        toggleLikedAction: (state: ImageState, { payload }) => {
            state.likeImagePendingId = '';

            const { public_id, tag } = payload;
            const likedImage = state.images.find((image) => image.public_id === public_id);
            const index = likedImage?.tags.indexOf(tag) || 0;

            index > -1 ? likedImage?.tags.splice(index, 1) : likedImage?.tags.push(tag);
        },
        likeImageFailure: (state: ImageState, { payload }) => {
            state.likeImagePendingId = '';
            state.errors.like.push(payload);
        },
        deleteImageStart: (state: ImageState, { payload }) => {
            state.deleteImagePendingId = payload;
        },
        deleteImageSuccess: (state: ImageState, { payload }) => {
            state.deleteImagePendingId = '';

            const deletedImage = state.images.filter((image) => image.public_id === payload)[0];
            const index = state.images.indexOf(deletedImage!);

            state.images.splice(index, 1);
        },
        deleteImageFailure: (state: ImageState, { payload }) => {
            state.deleteImagePendingId = '';
            state.errors.delete.push(payload);
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
    deleteImageStart,
    deleteImageSuccess,
    deleteImageFailure,
} = imageSlice.actions;

export const selectedImages = (state: RootState): Image[] => state.image.images;
export const fetchingImagesPending = (state: RootState): boolean => state.image.fetchingImagesPending;
export const likeImagePending = (id: string) => (state: RootState): boolean => state.image.likeImagePendingId === id;
export const rateImagePending = (id: string) => (state: RootState): boolean => state.image.rateImagePendingId === id;
export const deleteImagePending = (id: string) => (state: RootState): boolean =>
    state.image.deleteImagePendingId === id;

export default imageSlice.reducer;

// no tag fetches all images
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetchImages(tag?: string) {
    const encodedValue = tag ? encodeURIComponent(tag) : '';
    const param = encodedValue ? `?tag=${encodedValue}` : '';

    return async (dispatch) => {
        dispatch(fetchImagesStart());

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
        dispatch(likeImageStart(public_id));

        try {
            const response = await fetch(TAG_URL, {
                method: 'PUT',
                body: JSON.stringify({ public_id, tag }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(likeImageSuccess());
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

export function addTag(public_id: string, tag: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (dispatch) => {
        dispatch(likeImageStart(public_id));

        try {
            const response = await fetch(TAG_URL, {
                method: 'PUT',
                body: JSON.stringify({ public_id, tag }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(likeImageSuccess());
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

export function deleteImageCall(public_id: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (dispatch) => {
        dispatch(deleteImageStart(public_id));

        try {
            const response = await fetch(DELETE_URL, {
                method: 'DELETE',
                body: JSON.stringify({ public_id }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(deleteImageSuccess(public_id));
            } else {
                const key = Object.keys(data)[0];
                const message = data[key] ? data[key][0] : response.statusText;
                throw Error(message);
            }
        } catch (error) {
            dispatch(deleteImageFailure(error.message));
        }
    };
}
