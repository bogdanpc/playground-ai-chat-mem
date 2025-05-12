import React, { useState } from 'react';
import SplittedDocument from './SplittedDocument';
import { importFile } from './knowledge-actions';

export default () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [strategy, setStrategy] = useState('PARAGRAPH');

    const displayChunks = () => {

        const formData = new FormData();

        formData.append('title', title);
        formData.append('file', file);
        formData.append('strategy', strategy);

        
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile) {
            setFile(selectedFile);
            setTitle(selectedFile.name.replaceAll("_", " ").replaceAll("-", " ").replaceAll(".", " "));
        }
    };

    const handleStrategy = (e) => {
        setStrategy(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('file', file);
        formData.append('strategy', strategy);

        importFile(formData);
    };

    return <>
        <form onSubmit={handleSubmit}>
            <input name="file" type="file" className="file-input file-input-bordered" onChange={handleFileChange} />

            <div className="mt-5">
                <label className="input form-control">

                    <span className="label label-text">Title</span>

                    <input id="title"
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                </label>
            </div>

            <label className="select mt-5">
                <span className="label">Splitting Type</span>
                <select defaultValue="Paragraph" className="select" name="strategy" onChange={(e) => handleStrategy(e)}>
                    <option value="PARAGRAPH">Paragraph</option>
                    <option value="LINE">Line</option>
                    <option value="RECURSIVE">Recursive</option>
                    <option value="SENTENCE">Sentence</option>
                </select>
            </label>

            <div>
                <button type="button" className="btn btn-primary" onClick={() => displayChunks()}>
                    Display chunks
                </button>

                <button type="submit" className="btn btn-secondary m-5">
                    Upload
                </button>
            </div>
        </form>
        <SplittedDocument />
    </>
}