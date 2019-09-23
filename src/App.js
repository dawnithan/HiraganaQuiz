import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap-pulse.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            isHidden: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        if (event.target.checked) {
            // https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
            this.setState({value: [...this.state.value, event.target.value]})
        }
        else {
            // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
            this.setState({value: this.state.value.filter(function(item) { 
                    return item !== event.target.value 
                })
            });
        }
    }

    handleSubmit(event) {
        if(this.state.value.length > 0) {
            console.log('Selected ' + this.state.value);
            this.setState({isHidden: false})
        }
        event.preventDefault();
    }

    render() {
        const original = this.state.value;
        let elements = [];

        createList(original, elements);

        // TODO: "choices" should be 4 random answers from "elements", with one being the correct answer
        // Also, the list used to create each QuizItem should be a fixed size (e.g., 10)
        const choices = elements;

        return (
            <div className="quiz-div">
                <form onSubmit={this.handleSubmit}>

                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="1" value="あ,い,う,え,お" className="custom-control-input" onClick={this.handleClick} />
                        <label className="custom-control-label" htmlFor="1">a i u e o</label>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="2" value="か,き,く,け,こ" className="custom-control-input" onClick={this.handleClick} />
                        <label className="custom-control-label" htmlFor="2">ka ki ku ke ko</label>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="3" value="さ,し,す,せ,そ" className="custom-control-input" onClick={this.handleClick} />
                        <label className="custom-control-label" htmlFor="3">ta chi tsu te to</label>
                    </div>

                    <div className="button-spacing">
                        <input type="submit" className="btn btn-primary" value="Start the Quiz" />
                    </div>

                </form>
                {!this.state.isHidden && 
                    <ul>
                        {elements.map((item, index) => {
                            return <QuizItem key={index} character={item} choices={choices} />
                        })}
                    </ul>
                }
            </div>
        );
    }
}

class QuizItem extends Component {
    render() {
        
        const choices = this.props.choices;
        // assign choices to each <input>
        
        console.log(choices);

        return (
            <div className="form-group row">
                <label htmlFor="choice" className="character col-sm-2 col-form-label">{this.props.character}</label>
                <div className="col-sm-10">
                    <select name="choice" className="form-control">
                        <option value=""></option>
                        <option value="1">{choices[0]}</option>
                        <option value="2">{choices[1]}</option>
                        <option value="3">{choices[2]}</option>
                        <option value="4">{choices[3]}</option>
                    </select>
                </div>
            </div>
        );
    }
}

function createList(original, elements) {
    for (let i = 0; i < original.length; i++) {
        let split = original[i].split(",");
        for (let j = 0; j < split.length; j++) {
            elements.push(split[j]);
        }
    }
}

export default App;
