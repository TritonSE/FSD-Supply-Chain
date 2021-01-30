import React, { Component } from "react";
import "./App.css";
import AddButton from './add_button/AddButton';
import Sidebar from './sidebar/Sidebar';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <p> {this.state.apiResponse}</p>
                <AddButton/>
                <Sidebar/>
            </div>
        );
    }
}

export default App;