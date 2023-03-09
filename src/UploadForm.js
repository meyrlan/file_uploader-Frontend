import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

function UploadResult({ url, message }) {
    return (
        <div>
            <p>{message}</p>
            {url && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            )}
        </div>
    );
}

function UploadForm() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/whole_upload`,
                formData
            );
            setResult({ url: response.data.url, message: response.data.message });
        } catch (error) {
            setResult({ message: error.message });
        }
        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {loading && <p>Loading...</p>}
            {!loading && <UploadResult url={result.url} message={result.message} />}
        </div>
    );
}

export default UploadForm;
