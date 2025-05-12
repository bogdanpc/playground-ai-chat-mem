import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table/table";
import { useFetch } from "@/api/useFetch";

const columns = [{
    "header": "Text",
    "accessor": "text"
}, {
    "header": "Metadata",
    "accessor": "metadata"
}];


const Embeddings = () => {

    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 25;
    const [ page, setPage ] = useState(0);

    const { data: items } = useFetch(`/rag/embeddings?page=${page ? page : 0}&limit=${ITEMS_PER_PAGE}`);

    if (!items) return null;
    
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6">Embeddings</h1>
            {items && <Table columns={columns} data={items.data} pageSize={ITEMS_PER_PAGE} totalPages={items.size} onPageChange={handlePageChange} onView={(item) => navigate(`/knowledge/embeddings/${item.id}`)} />}
        </div>
    );
};

export default Embeddings;