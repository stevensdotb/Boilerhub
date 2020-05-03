import React from 'react';
import './sidebar.css';

import SideBarContainer from '../../redux/containers/sidebar';

const SideBar = () => {
    return (
        <div className="boilerhub-side">
            <SideBarContainer/>
        </div>
    )
}

export default SideBar;