import React, {useState, useEffect} from 'react';

import {useCookies} from 'react-cookie';
import {Form} from 'react-bootstrap';

import {SidebarItemAlpha, SidebarItemExpiry} from './SidebarItem';

import './Sidebar.scss';

function Sidebar(props) {
  const [itemsAlpha, setItemsAlpha] = useState([]);
  const [itemsExpiry, setItemsExpiry] = useState([]);
  const [cookies] = useCookies(['token']);
  const [sortBy, setSortBy] = useState('Alphabetical');
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    setItemsAlpha(props.itemsAlpha);
  }, [props.itemsAlpha])

  useEffect(() => {
    setItemsExpiry(props.itemsExpiry);
  }, [props.itemsExpiry])

  return (
    <div className='sidebar_container'>
      <Form id='sort_by_dropdown' onChange={(e) => setSortBy(e.target.value)}>
        <Form.Control as='select' custom>
          <option>Alphabetical</option>
          <option>Expiry</option>
        </Form.Control>
      </Form>

      {sortBy === 'Alphabetical' 
        && <p id="expand_all_btn" onClick={() => setExpandAll(!expandAll)}>
            {expandAll ? 'Collapse all' : 'Expand all'}
        </p>
      }
      
      {itemsAlpha === null
        ? <p>Could not connect to backend.</p>
        : sortBy === 'Alphabetical' 
          ? itemsAlpha.map((item, idx) => <SidebarItemAlpha key={item.name+'_alpha'+idx} item={item} expand={expandAll}/>)
          : itemsExpiry.map((batch, idx) => <SidebarItemExpiry key={batch.itemName+'_expiry'+idx} batch={batch}/>)
      }
    </div>
  );
}

export default Sidebar;
