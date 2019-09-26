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
        this.handleFinish = this.handleFinish.bind(this);
    }

    handleClick(event) {
        if (event.target.checked) {
            this.setState({value: [...this.state.value, event.target.value]})
        }
        else {
            this.setState({value: this.state.value.filter(function(item) { 
                    return item !== event.target.value 
                })
            });
        }
    }

    handleSubmit(event) {
        if(this.state.value.length > 0) {
            this.setState({isHidden: false})
        }
        event.preventDefault();
    }

    handleFinish(event) {
        alert("Finished.");
        event.preventDefault();

        for (let i = 0; i < 10; i++) {
            console.log(event.target[i].value);
        }
    }

    render() {
        const original = this.state.value;
        const characters = [];
        const choices = [];

        createQuiz(original, characters, choices, 10);

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
                        <input type="submit" className="btn btn-primary" value="Start the Quiz!" />
                    </div>
                </form>
                {!this.state.isHidden && 
                    <form onSubmit={this.handleFinish}>
                        <ul>
                            {characters.map((item, index) => {
                                return <QuizItem key={index} draw={item} choices={choices} index={index} />
                            })}
                        </ul>
                        <div className="d-flex flex-row-reverse button-spacing">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                }
            </div>
        );
    }
}

class QuizItem extends Component {
    render() {
        const c = this.props.choices;
        const index = this.props.index;
        return (
            <div className="form-group row">
                <label htmlFor="choice" className="character col-sm-2 col-form-label">{this.props.draw}</label>
                <div className="col-sm-10">
                    <select name="choice" className="form-control">
                        <option value=""></option>
                        <option value="1">{c[index][0]}</option>
                        <option value="2">{c[index][1]}</option>
                        <option value="3">{c[index][2]}</option>
                        <option value="4">{c[index][3]}</option>
                    </select>
                </div>
            </div>
        );
    }
}

function createQuiz(original, characters, choices, numQuestions) {
    const elements = [];
    let list = [];

    const dictionary = {あ:"a",か:"ka",さ:"sa",た:"ta",な:"na",は:"ha",ま:"ma",や:"ya",ら:"ra",わ:"wa",ん:"n", 
    い:"i",き:"ki",し:"shi",ち:"chi",に:"ni",ひ:"hi",み:"mi",り:"ri",う:"u",く:"ku",す:"su",つ:"tsu",ぬ:"nu",
    ふ:"fu",む:"mu",ゆ:"yu",る:"ru",え:"e",け:"ke",せ:"se",て:"te",ね:"ne",へ:"he",め:"me",れ:"re",お:"o",
    こ:"ko",そ:"so",と:"to",の:"no",ほ:"ho",も:"mo",よ:"yo",ろ:"ro",を:"wo"};

    // Combine the selected character groups into a single array
    for (let i = 0; i < original.length; i++) {
        let split = original[i].split(",");
        for (let j = 0; j < split.length; j++) {
            elements.push(split[j]);
        }
    }

    // Draw up to numQuestions characters randomly and save to the characters array
    for (let i = 0; i < numQuestions; i++) {
        const draw = elements[Math.floor(Math.random()*elements.length)];
        characters.push(draw);
        
        for (let j = 0; j < 4; j++) {
            const x = elements[Math.floor(Math.random()*elements.length)];
            list += dictionary[x]
            if (j !== 3) {
                list += " ";
            }
        }

        let y = list.split(' ');

        // Replace an element of the list with the answer
        y[Math.floor(Math.random()*y.length)] = dictionary[draw] + " <";
        choices.push(y);
        
        list = "";
    }
}

export default App;
