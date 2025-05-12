import ImportForm from './ImportFile';
import RagImportWebPage from './RagImportWebPage';

const RagImport = () => {
    return (
        <div className="w-full p-6">

            <h1 className="text-2xl font-bold mb-6">Add Knowledge</h1>
            <div role="tablist" className="tabs tabs-boxed">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Upload Document" defaultChecked />
                <div role="tabpanel" className="tab-content p-4"><ImportForm /></div>


                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Web Page" />
                <div role="tabpanel" className="tab-content p-4"><RagImportWebPage /></div>
            </div>
        </div>
    );
};

export default RagImport;