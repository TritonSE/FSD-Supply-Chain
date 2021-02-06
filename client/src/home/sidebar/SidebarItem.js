import React, {useState} from 'react';

import {AiOutlinePlusCircle, AiFillMinusCircle} from 'react-icons/ai'
import './SidebarItem.scss'

function SidebarItem({item}) {
    const [expanded, setExpanded] = useState(false);

    const itemName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    return (
        <div className='sidebar_item_container'>
            <div className='sidebar_header' onClick={() => setExpanded(!expanded)}>
                {expanded 
                    ? <AiFillMinusCircle />
                    : <AiOutlinePlusCircle />
                }
                <p className='item_name'>{itemName}</p>
            </div>
            
            {expanded && 
                item.batches.map(batch => {
                    const dateString = new Date(batch.outDate).toISOString()
                            .replace(/^\d+-(\d+)-(\d+)T.*$/, "$1/$2");
                    return <div className="batch">
                        <p> &nbsp; &nbsp;{itemName} - {dateString}</p>
                    </div>
                })
            }
        </div>
    )
}

export default SidebarItem;