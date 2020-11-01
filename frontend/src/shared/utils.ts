export function makeChunks(images: any[], chunkSize: number): any[] {
    const roundedChunkSize = Math.round(chunkSize);
    let arr: any[] = [];

    for (let index = 0; index < images.length; index += roundedChunkSize) {
        const chunk = images.slice(index, index + roundedChunkSize);

        arr.push(chunk);
    }

    return arr;
}
