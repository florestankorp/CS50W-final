import React, { useState } from 'react';
import { Base64EncodedImage } from '../../shared/models';
import Spinner from '../../spinner.svg';
import './Uploader.scss';

export function Uploader() {
    const newEmptyFile = new File([''], 'default');

    const [previewSource, setPreviewSource] = useState<Base64EncodedImage>('');
    const [selectedFile, setSelectedFile] = useState<File>(newEmptyFile);
    const [filePath, setFilePath] = useState<string>('');

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.target.files![0];
        const path = event.target.value;

        previewFile(file);
        setSelectedFile(file);
        setFilePath(path);
    };

    const previewFile = (file: File) => {
        setHasError(false);
        setErrorMessage('');
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64EncodedImage = reader.result;
            setPreviewSource(base64EncodedImage);
        };
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setPreviewSource('');
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

    const uploadImage = async (base64EncodedImage: Base64EncodedImage) => {
        setHasError(false);
        setErrorMessage('');
        setIsLoading(true);

        try {
            await fetch('http://localhost:8000/upload/', {
                method: 'POST',
                body: JSON.stringify({ image: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => {
                setIsLoading(false);
                if (response.status === 400) {
                    throw new Error('Please chose a file');
                }

                if (response.status === 201) {
                    setIsLoading(false);
                    setFilePath('');
                    setPreviewSource('');
                    setSelectedFile(newEmptyFile);
                    setSuccessMessage('Success! File has been uploaded.');
                }
            });
        } catch (error) {
            setSuccessMessage('');
            setIsLoading(false);
            setHasError(true);
            setErrorMessage(error.message);
        }
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
            {hasError && <span className="error-message">{errorMessage}</span>}
            {isLoading && <img src={Spinner} alt="Loading Spinner" />}

            {successMessage && <span className="success-message">{successMessage}</span>}
        </div>
    );
}
