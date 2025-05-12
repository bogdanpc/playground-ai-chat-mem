import SvgChevronDoubleRight from '@/assets/icons/chevronDoubleRight.svg?react';
import ChatIcon from '@/assets/icons/chat.svg?react';
import DocumentIcon from '@/assets/icons/document.svg?react';
import { Link } from 'react-router-dom';

const SideBarMini = ({ isDrawerOpen, toggleDrawer }) => {

    return (<div className={`${isDrawerOpen ? 'hidden' : 'block'} bg-base-100 h-full min-w-fit shadow-md z-30`}>
        <div className="flex flex-col items-center py-4 space-y-4">


            <button onClick={toggleDrawer} aria-label="expand sidebar" className="btn btn-square btn-sm btn-ghost">
                <SvgChevronDoubleRight />
            </button>
            <Link to="/"><ChatIcon /></Link>
            <Link to="/knowledge"><DocumentIcon /></Link>

        </div>
    </div>)

};

export default SideBarMini;