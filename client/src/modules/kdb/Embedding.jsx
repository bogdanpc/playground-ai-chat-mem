import { useFetch } from "@/api/useFetch";
import { useNavigate, useParams } from "react-router-dom";
const Embedding = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {data: embedding} = useFetch(`rag/embeddings/${id}`);
    if(!embedding) return null;

    console.log('embedding', embedding);

    return (
        <div className="p-4 mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-500 hover:underline"
            >
                ← Back to Embeddings
            </button>
            <div className="rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Embedding</h1>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Text</h2>
                <div>{embedding.text}</div>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Metdata</h2>
                <ul className="list-disc pl-5 text-gray-600">
                    {embedding.metadata && Object.entries(JSON.parse(embedding.metadata)).map(e => <li key={e[0]}><span className="font-bold">{e[0]}</span>:{e[1]}</li>)}
                </ul>
            </div>
        </div>


    );
};

export default Embedding;