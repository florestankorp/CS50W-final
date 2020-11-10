import { TAGS } from './constants';
import { Image } from './models';

export function makeChunks(images: Image[], chunkSize: number): Image[][] {
    const arr: Image[][] = [];
    const length = images.length || 1;
    const roundedChunkSize = Math.ceil(chunkSize) || 1;

    for (let index = 0; index <= length; index += roundedChunkSize) {
        const chunk: Image[] = images.slice(index, index + roundedChunkSize);
        arr.push(chunk);
    }

    return arr;
}

export function getRating(tags: string[]): number {
    const ratings = tags.filter((tag: string) => tag !== TAGS.FAV);
    if (ratings.length) {
        const ratingsArray: number[] = ratings.map((rating) => {
            const res = rating.split(':')[1];
            return parseInt(res);
        });

        return Math.max(...ratingsArray);
    }

    return 0;
}
