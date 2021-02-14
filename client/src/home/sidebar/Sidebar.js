import React, {useState, useEffect} from 'react';

import {useCookies} from 'react-cookie';
import {getAllItems} from '../../MongodbFunctions';
import {Form} from 'react-bootstrap';

import {SidebarItemAlpha, SidebarItemExpiry} from './SidebarItem';

import './Sidebar.scss';

function Sidebar() {
  const [itemsAlpha, setItemsAlpha] = useState([]);
  const [itemsExpiry, setItemsExpiry] = useState([]);
  const [cookies] = useCookies(['token']);
  const [sortBy, setSortBy] = useState('Alphabetical');
  const [expandAll, setExpandAll] = useState(false);

  // Sort by Alphabetical order
  const sortAlpha = (a, b) => {
    return a.name > b.name;
  }

  // Sort by Expiry order
  const sortExpiry = (a, b) => {
    a = new Date(a.outDate);
    b = new Date(b.outDate);
    let diff = a.getTime() - b.getTime();
    if (diff != 0) {
      return diff;
    }
    
    // If time is the same, sort by alphabetical order
    return a.name > b.name;
  }

  // Retrieve all items from MongoDB 
  useEffect(() => {
    getAllItems(cookies.token).then(items_raw => {
      var batches_raw = [];

      if (items_raw != null) {
        items_raw.forEach(item => {
          // Format item names
          item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);

          // Format outDates and prepare batches_raw for sorting by expiry
          item.batches.forEach(batch => {
            batch.outDate = new Date(batch.outDate).toISOString().replace(/^\d+-0?(\d+)-0?(\d+)T.*$/, "$1/$2");
            batch.itemName = item.name;
            batches_raw.push(batch);
          })
        });
        
        setItemsAlpha(items_raw.sort(sortAlpha));
        setItemsExpiry(batches_raw.sort(sortExpiry))
      }
    })
  }, []);

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
