export function makeChunks(images: any[], chunkSize: number): any[] {
    let arr: any[] = [];
    const length = images.length || 1;
    const roundedChunkSize = Math.round(chunkSize) || 1;

    for (let index = 0; index <= length; index += roundedChunkSize) {
        const chunk = images.slice(index, index + roundedChunkSize);
        arr.push(chunk);
    }

    return arr;
}
