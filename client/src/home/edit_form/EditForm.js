import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { useCookies } from "react-cookie";
import { editItem } from "../../MongodbFunctions";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import "react-datepicker/dist/react-datepicker.css";
import "./EditForm.scss";

function EditTempButton() {
    const [formRendered, toggleFormRendered] = useState(false);
  
    return (
      <div className="EditForm">
        <Button variant="dark" onClick={() => toggleFormRendered(!formRendered)}>
          Edit Item
        </Button>
        {formRendered && (
          <EditForm closeForm={() => toggleFormRendered(false)}></EditForm>
        )}
      </div>
    );
  }
  
  function EditForm(props) {
    // Input fields
    const [itemName, setItemName] = useState("");
    const [oldBatchId, setOldBatchId] = useState("");
    const [newBatchId, setNewBatchId] = useState("");
    const [lbPerHouse, setLbPerHouse] = useState(0);
    const [weight, setWeight] = useState(0);
    const [outByDate, setOutByDate] = useState(new Date());
  
    const [cookies] = useCookies(["token"]);
    const [showWeightWarning, setWeightWarning] = useState(false);
    const [showitemNameWarning, setitemNameWarning] = useState(false);
    const [showbatchIdWarning, setbatchIdWarning] = useState(false);
    // Logic for adding recommendations will need to be added
    const [rec, setRec] = useState([]);
    const [itemList, setItemList] = useState([]);
  
    useEffect(() => {
      setItemList(props.itemList);
    }, [props.itemList])
  
    return (
      <div className="edit_form_container">
        <Form className="edit_form">
          <Form.Group className="input_field_container">
            <Form.Group>
              <Form.Label> Item Name</Form.Label>
              <Form.Control
                
                
                onChange={event => {
                  let string = event.target.value.trim().toLowerCase();
                  if(string.length === 0){
                    setitemNameWarning(true);
                  }
                  else{ 
                    setitemNameWarning(false);
                  }
                  setItemName(string);
                }}
                onBlur={e => {
                    if(itemName.length === 0){
                      setitemNameWarning(true);
                    }
                    else{
                      setitemNameWarning(false);
                    }
                  }}
                
                placeholder="e.g. Apples"
                autoFocus
                styling={{
                  border: "1px solid #cbcdd1",
                  borderRadius: '5px',
                  boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                  hoverBackgroundColor: "#80bdff",
                  height: '40px',
                }}
              />
              {showitemNameWarning && (
                <Form.Text className="warning">Item name is required</Form.Text>
              )}

            </Form.Group>
  
            <Form.Group>
              <Form.Label> Batch ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 1234"
                
                onBlur={(e) => {
                  if(newBatchId.length === 4){
                    setbatchIdWarning(false);
                  }
                  else{
                    setbatchIdWarning(true);
                  }
                }}
                onChange={(event) => {
                  let val = event.target.value.trim().toLowerCase();
                  if(val.length === 4){
                    setbatchIdWarning(false);
                  }
                  else{
                    setbatchIdWarning(true);
                  }
                  setOldBatchId(val);
                  setNewBatchId(val);
                }}
              />
              {showbatchIdWarning && (
                <Form.Text className="warning">4 digit Batch ID is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Weight (lbs)</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 50"
                onBlur={(e) => {
                  if(weight > 0 && weight < Infinity){
                    
                    setWeightWarning(false);
                  }
                  else{
                    setWeightWarning(true);
                  }
                }}
                onChange={(event) => {
                  let val = Number(event.target.value.trim());
  
                  // Checks for valid integer
                  if (val !== Infinity && val > 0) {
                    setWeight(val);
                    setWeightWarning(false);
                  } else {
                    setWeightWarning(true);
                  }
                }}
              />
              {showWeightWarning && (
                <Form.Text className="warning">Invalid weight value</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group>
              <Form.Label> Out by date</Form.Label>
              <DatePicker
                selected={outByDate}
                onChange={(date) => setOutByDate(date)}
              />
            </Form.Group>
  

          </Form.Group>
  
          <Button variant="light" onClick={() => props.closeForm()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            
              onClick={() => {
                if(true/*itemName.length > 0 && newBatchId.length === 4 && weight > 0 && weight < Infinity*/){
                  editItem(cookies.token, itemName, oldBatchId, newBatchId, weight, outByDate);
                  props.closeForm();
                }
                else{
                  if(itemName.length === 0){
                    setitemNameWarning(true);
                  }
                  if(newBatchId.length !== 4){
                    setbatchIdWarning(true);
                  } 
                  if(weight <=0 || weight > Infinity){
                    setWeightWarning(true);
                  }
                  
                }
              }}  
              
  
       
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  
  export default EditTempButton;