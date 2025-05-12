

const SplittedDocument = () => {
    const chunks = [];

    return (
        <div className="mockup-code w-full">
            {chunks && chunks.map(c => <><span className="bg-warning text-warning-content">{c}</span><span className="p-4">|</span></>)}
        </div>
    )
};


export default SplittedDocument;