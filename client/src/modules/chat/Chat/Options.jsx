const Options = () => {
    return (<div className="dropdown dropdown-down">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full w-8 ring-primary ring p-1"><PlusIcon /></div>
        </div>
        <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Attach Files
            </li>
        </ul>
    </div>);
};

export default Options;

