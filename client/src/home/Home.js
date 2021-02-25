import React, { useState, useEffect } from "react";
import { getAllItems } from '../MongodbFunctions';
import { useCookies } from "react-cookie";
import { navigate } from "@reach/router";

import AddButton from "./add_button/AddButton";
import Sidebar from "./sidebar/Sidebar";
import Calendar from "./calendar/Calendar";

const Home = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [itemList, setItemList] = useState([]);
  const [itemsAlpha, setItemsAlpha] = useState([]);
  const [itemsExpiry, setItemsExpiry] = useState([]);
  const [items, setItems] = useState([]);

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies.token]);

  // Sort items by Alphabetical order
  const sortAlpha = (a, b) => {
    return a.name > b.name;
  }

  // Sort items by Expiry order
  const sortExpiry = (a, b) => {
    a = new Date(a.outDate);
    b = new Date(b.outDate);
    let diff = a.getTime() - b.getTime();
    if (diff !== 0) {
      return diff;
    }
    
    // If time is the same, sort by alphabetical order
    return a.name > b.name;
  }

  // Retrieve all items from MongoDB 
  useEffect(() => {
    getAllItems(cookies.token).then(items_raw => {
      setItems(JSON.parse(JSON.stringify(items_raw)));
      console.log(items_raw);

      console.log(items_raw);
      var batches_raw = [];
      var itemNames = [];

      if (items_raw != null) {
        items_raw.forEach(item => {
          // Format item names
          item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          itemNames.push({
            id: itemNames.length,
            name: item.name
          });

          // Format outDates and prepare batches_raw for sorting by expiry
          item.batches.forEach(batch => {
            batch.outDate = new Date(batch.outDate).toISOString().replace(/^\d+-0?(\d+)-0?(\d+)T.*$/, "$1/$2");
            batch.itemName = item.name;
            batches_raw.push(batch);
          })
        });
        
        setItemList(itemNames);
        setItemsAlpha(items_raw.sort(sortAlpha));
        setItemsExpiry(batches_raw.sort(sortExpiry))
      }
    })
  }, []);

  return (
    <div>
      <AddButton itemList={itemList}/>
      <Sidebar itemsAlpha={itemsAlpha} itemsExpiry={itemsExpiry}/>
      <Calendar items={items}/>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
