import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { UPLOAD_URL } from '../../shared/constants';
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
            await fetch(UPLOAD_URL, {
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
        <section className="section">
            <div className="columns is-centered">
                <div className="column">
                    <h1 className="title has-text-centered">Upload an Image</h1>
                    <form onSubmit={handleSubmit} className="upload-form">
                        <div className="file field has-addons has-addons-centered">
                            <label className="file-label">
                                <input
                                    className="file-input button"
                                    type="file"
                                    id="fileInput"
                                    name="image"
                                    onChange={handleValueInputChange}
                                    value={filePath}
                                />

                                <span className="file-cta">
                                    <span className="file-icon">
                                        <FontAwesomeIcon icon={faFileUpload} />
                                    </span>
                                    <span className="file-label">Choose a file…</span>
                                </span>
                            </label>
                            <button className="button is-success" type="submit">
                                <span>Submit</span>
                            </button>
                        </div>
                        <div className="file field has-addons has-addons-centered">
                            {hasError && <span className="error-message has-text-centered">{errorMessage}</span>}
                            {previewSource && (
                                <img src={previewSource.toString()} alt="chosen" style={{ height: '300px' }} />
                            )}
                            {isLoading && <img src={Spinner} alt="Loading Spinner" />}
                            {successMessage && (
                                <span className="success-message has-text-centered">{successMessage}</span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
