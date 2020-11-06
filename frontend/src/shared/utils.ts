import { Image } from './models';

export function makeChunks(images: Image[], chunkSize: number): Image[][] {
    const arr: Image[][] = [];
    const length = images.length || 1;
    const roundedChunkSize = Math.round(chunkSize) || 1;

    for (let index = 0; index <= length; index += roundedChunkSize) {
        const chunk: Image[] = images.slice(index, index + roundedChunkSize);
        arr.push(chunk);
    }

    return arr;
}
