import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table/table";
import { useFetch } from "@/api/useFetch";
import { useTranslation } from 'react-i18next';

const columns = [{
    "header": "Name",
    "accessor": "name"
},{
    "header": "Description",
    "accessor": "description"
}, {
    "header": "Metadata",
    "accessor": "metadata",
    "render": item => Object.entries(item).map(e => <div key={`meta-${e[0]}`}><b>{e[0]}</b>: {e[1]}</div>)
}];


const Documents = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    
    const ITEMS_PER_PAGE = 25;
    const [ page, setPage ] = useState(0);

    const { data: items } = useFetch(`knowledge?page=${page ? page : 0}&limit=${ITEMS_PER_PAGE}`);

    if (!items) return null;
    
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6">{t('kdb.documents')}</h1>
            {items && <Table columns={columns} data={items.data} pageSize={ITEMS_PER_PAGE} totalPages={items.size} onPageChange={handlePageChange} onView={(item) => navigate(`/knowledge/${item.id}`)} />}
        </div>
    );
};

export default Documents;