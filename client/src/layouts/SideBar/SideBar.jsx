
import SvgChevronDoubleLeft from '@/assets/icons/chevronDoubleLeft.svg?react';
import DocumentIcon from '@/assets/icons/document.svg?react';
import EmbedIcon from '@/assets/icons/embed.svg?react';
import ChatIcon from '@/assets/icons/chat.svg?react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isDrawerOpen, toggleDrawer }) => {

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-controller" aria-label="close sidebar"
                className={`drawer-overlay ${isDrawerOpen ? '' : 'hidden'}`}
                onClick={toggleDrawer} />
            <div className="h-full p-4">
                <div>
                    <button
                        onClick={toggleDrawer}
                        aria-label="collapse sidebar"
                        className="btn btn-square btn-sm btn-ghost">
                        <SvgChevronDoubleLeft />
                    </button>
                </div>

                <ul className="menu">
                    <li>
                        <Link to="/"><ChatIcon /> Chat</Link>
                    </li>
                    <li>
                        <details id="kdb">
                            <summary className="group"> <DocumentIcon /> Knowledge</summary>
                            <ul>

                                <li>
                                    <Link to="/knowledge/import"> <DocumentIcon /><span>Import</span></Link>
                                </li>
                                <li>
                                    <Link to="/knowledge/documents"> <DocumentIcon /><span>Documents</span></Link>
                                </li>
                                <li>
                                    <Link to="/knowledge/embeddings"> <EmbedIcon width="24" height="24" /><span>Embeddings</span></Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;