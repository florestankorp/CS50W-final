import { createSlice } from '@reduxjs/toolkit';
import { LIST_URL } from './constants';
import { ImageState } from './models';
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
        fetchImagesStart: (state: ImageState, { payload }) => {
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
    },
});

export const { fetchImagesStart, fetchImagesSuccess, fetchImagesFailure } = imageSlice.actions;

export const selectedImages = (state: RootState) => state.image.images;
export const imagesAreLoading = (state: RootState) => state.image.isLoading;

export default imageSlice.reducer;

// no tag fetches all images
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
