import React, { useState } from 'react';

export default () => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return <>
        <form onSubmit={handleSubmit}>

            <div className="mt-5">
                <label className="input form-control w-full">

                    <span className="label label-text">URL</span>

                    <input id="url"
                        type="text"
                        placeholder="Type URL here"
                        className="input input-bordered"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)} />

                </label>
            </div>

            <div>

                <button type="submit" className="btn btn-secondary m-5">
                    Upload
                </button>
            </div>
        </form>
    </>
}