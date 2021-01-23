import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NumericInput from 'react-numeric-input';

function AddButton() {
    const [formRendered, toggleFormRendered] = useState(false);

    return (
        <div className="AddButton">
            <Button variant="dark" onClick={() => toggleFormRendered(!formRendered)}>Add Item</Button>
            {formRendered && <AddItemForm closeForm={() => toggleFormRendered(false)}></AddItemForm>}
        </div>
    )

}

function AddItemForm(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const[rec, setRec] = useState([]);


    
    return (
        <Form>
            
            <Form.Label>Item Name</Form.Label>
            <Form.Control type = "text" placeholder = "Eg. Apples" />

            <b>OR</b>
            <Form.Label>Item Number</Form.Label>
            <Form.Control type = "text" placeholder = "Eg. 1234" />
            <Form.Label>Weight(lbs)</Form.Label>
            <Form.Control type = "text" placeholder = "Eg. 50" />
            
            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)}/> 
            <NumericInput min = {0}
            size={4}
            
            />
            lbs per Household
            <Button variant='light' onClick={() => props.closeForm()}>Cancel</Button>
            {//Leaving recomendations }
            {(rec.length == 0)?
            <h1>No Issue</h1>:
            rec.map(txt=>{return <h1>{txt}</h1>})
            }
            
            
        </Form>
    )
}

export default AddButton;