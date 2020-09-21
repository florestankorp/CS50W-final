import React, { useState } from 'react';

export function Uploader() {
    // hooks with initial values
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
    const [selectedFile, setSelectedFile] = useState<File>(new File([''], 'default'));
    const [filePath, setFilePath] = useState<string>('');

    const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.target.files![0];
        const path = event.target.value;

        previewFile(file);
        setSelectedFile(file);
        setFilePath(path);
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64EncodedImage = reader.result;
            setPreviewSource(base64EncodedImage);
        };
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            const base64EncodedImage = reader.result;
            uploadImage(base64EncodedImage);
        };
        reader.onerror = (error: ProgressEvent<FileReader>) => {
            console.error('Something went wrong!\n', error);
        };
    };

    const uploadImage = async (base64EncodedImage: any) => {
        console.log(base64EncodedImage);
        try {
            await fetch('http://localhost:8000/upload/', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });

            setFilePath('');
            setPreviewSource('');
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleValueInputChange}
                    value={filePath}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && <img src={previewSource.toString()} alt="chosen" style={{ height: '300px' }} />}
        </div>
    );
}
