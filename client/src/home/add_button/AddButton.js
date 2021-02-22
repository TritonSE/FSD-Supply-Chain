import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { useCookies } from "react-cookie";
import { postNewItem } from "../../MongodbFunctions";

import "./AddButton.scss";
import "react-datepicker/dist/react-datepicker.css";

function AddButton() {
  const [formRendered, toggleFormRendered] = useState(false);

  return (
    <div className="AddButton">
      <Button variant="dark" onClick={() => toggleFormRendered(!formRendered)}>
        Add Item
      </Button>
      {formRendered && (
        <AddItemForm closeForm={() => toggleFormRendered(false)}></AddItemForm>
      )}
    </div>
  );
}

function AddItemForm(props) {
  // Input fields
  const [itemName, setItemName] = useState("");
  const [batchId, setbatchId] = useState("");
  const [lbPerHouse, setLbPerHouse] = useState(0);
  const [weight, setWeight] = useState(0);
  const [outByDate, setOutByDate] = useState(new Date());

  const [cookies] = useCookies(["token"]);
  const [showWeightWarning, setWeightWarning] = useState(false);
  const [showitemNameWarning, setitemNameWarning] = useState(false);
  const [showbatchIdWarning, setbatchIdWarning] = useState(false);
  // Logic for adding recommendations will need to be added
  const [rec, setRec] = useState([]);

  return (
    <div className="add_item_form_container">
      <Form className="add_item_form">
        <Form.Group className="input_field_container">
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Apples"
              onChange={(event) =>{
                let val = event.target.value.trim().toLowerCase();
                if(val.length > 0){
                  setItemName(event.target.value.trim().toLowerCase());
                  setitemNameWarning(false);
                }
                else{
                  setitemNameWarning(true);
                }
                
              }}
            />
            {showitemNameWarning && (
              <Form.Text className="warning">Item name is required</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Batch ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 1234"
              onChange={(event) => {
                let val = event.target.value.trim().toLowerCase();
                if(val.length > 0){
                  setbatchId(event.target.value.trim().toLowerCase());
                  setbatchIdWarning(false);
                }
                else{
                  setbatchIdWarning(true);
                }
                
                
              }}
            />
            {showbatchIdWarning && (
              <Form.Text className="warning">Batch ID is required</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Weight(lbs)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 50"
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
            <Form.Label>Out by date</Form.Label>
            <DatePicker
              selected={outByDate}
              onChange={(date) => setOutByDate(date)}
            />
          </Form.Group>

          <Form.Group>
            <NumericInput
              min={0}
              size={1}
              value={lbPerHouse}
              onChange={(val) => setLbPerHouse(val)}
            />
            &nbsp; &nbsp;&nbsp;&nbsp; lbs per Household
            <p id="household_calculator">
              = {weight >= 0 && lbPerHouse > 0 ? weight / lbPerHouse : 0}{" "}
              households{" "}
            </p>
          </Form.Group>

          <Form.Group>
            <div>
              Recommendations
              {rec.length === 0 ? (
                <p className="recommendation_pos">No Issues</p>
              ) : (
                rec.map((txt) => <p className="recommendations_neg">{txt}</p>)
              )}
            </div>
          </Form.Group>
        </Form.Group>

        <Button variant="light" onClick={() => props.closeForm()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          
            onClick={() => {
              if(itemName.length > 0 && batchId.length > 0){
                postNewItem(cookies.token, itemName, batchId, weight, outByDate);
                props.closeForm();
              }
              else{
                <Button.Text className="warning">One or more required feild is invalid</Button.Text>
              }
            }}  
            

     
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddButton;
