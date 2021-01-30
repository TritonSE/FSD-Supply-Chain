import React, {useState, useEffect} from 'react';

import {getAllItems} from '../MongodbFunctions';
import SidebarItem from './SidebarItem';

import './Sidebar.scss';

function Sidebar() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        
        getAllItems().then(items_raw => {
            setItems(items_raw);
            console.log(items_raw);
        })
    }, [])

    return (
        <div className='sidebar_container'>
            {items.map(item => <SidebarItem item={item}/>)}
        </div>
    )
}

export default Sidebar;