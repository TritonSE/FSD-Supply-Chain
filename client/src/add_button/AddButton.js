import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';

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
    return (
        <form>
            <Button variant='light' onClick={() => props.closeForm()}>Cancel</Button>
        </form>
    )
}

export default AddButton;