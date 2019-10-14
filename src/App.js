import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap-pulse.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            choices: [],
            characters: [],
            languageList: [],
            isHidden: true,
            numQuestions: 10
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentDidMount() {
        const hiragana = [
            'あ,い,う,え,お',
            'か,き,く,け,こ',
            'さ,し,す,せ,そ',
            'た,ち,つ,て,と',
            'な,に,ぬ,ね,の',
            'は,ひ,ふ,へ,ほ',
            'ま,み,む,め,も',
            'や,ゆ,よ',
            'ら,り,る,れ,ろ',
            'わ,を,ん'
        ];

        const romaji = [
            'a i u e o',
            'ka ki ku ke ko',
            'sa shi su se so',
            'ta chi tsu te to',
            'na ni nu ne no',
            'ha hi fu he ho',
            'ma mi mu me mo',
            'ya yu yo',
            'ra ri ru re ro',
            'wa wo n'
        ];

        const result = [];

        for (let i = 0; i < hiragana.length; i++) {
            
            let newItem = {
                id: i, 
                hiragana: hiragana[i], 
                romaji: romaji[i]
            };

            result.push(newItem);
        }

        this.setState({languageList: result});
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
        event.preventDefault();

        if (this.state.value.length > 0) {
            this.setState({isHidden: false})
            
            const original = this.state.value;
            const characters = [];
            const choices = [];
            
            createQuiz(original, characters, choices, this.state.numQuestions);

            this.setState({characters: characters});
            this.setState({choices: choices});
        }
    }

    handleFinish(event) {
        event.preventDefault();
        
        var count = 0;

        // Calculate how many answers are correct
        for (let i = 0; i < this.state.numQuestions; i++) {
            console.log("Choice selected = " + event.target[i].value);
            console.log("Answer = " + this.state.choices[i][4]);

            if (Number(event.target[i].value) === this.state.choices[i][4]) {
                count++;
            }
        }
        alert("You got " + count + " questions correct.");
    }

    render() {
        return (
            <div className="quiz-div">
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.languageList.map((item, index) => {
                            return <Selector 
                                key={item.id} 
                                language={item} 
                                toggle={this.handleClick} 
                            />
                        })
                    }
                    <div className="button-spacing">
                        <input type="submit" className="btn btn-primary" value="Start the Quiz!" />
                    </div>
                </form>
                {!this.state.isHidden && 
                    <form onSubmit={this.handleFinish}>
                        <ul>
                            {
                                this.state.characters.map((item, index) => {
                                    return <QuizItem 
                                        key={index} 
                                        draw={item} 
                                        choices={this.state.choices} 
                                        index={index} 
                                    />
                                })
                            }
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
                        <option value="">-- select --</option>
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

class Selector extends Component {
    render() {
        return (
            <div className="custom-control custom-switch">
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    id={this.props.language.id}
                    value={this.props.language.hiragana} 
                    onClick={this.props.toggle} 
                />
                <label className="custom-control-label" htmlFor={this.props.language.id}>
                    {this.props.language.romaji}
                </label>
            </div>
        );
    }
}

function createQuiz(original, characters, choices, numQuestions) {
    const elements = [];
    let list = [];

    const dictionary = {
        あ:"a",か:"ka",さ:"sa",た:"ta",な:"na",は:"ha",ま:"ma",や:"ya",ら:"ra",わ:"wa",ん:"n", 
        い:"i",き:"ki",し:"shi",ち:"chi",に:"ni",ひ:"hi",み:"mi",り:"ri",う:"u",く:"ku",す:"su",つ:"tsu",ぬ:"nu",
        ふ:"fu",む:"mu",ゆ:"yu",る:"ru",え:"e",け:"ke",せ:"se",て:"te",ね:"ne",へ:"he",め:"me",れ:"re",お:"o",
        こ:"ko",そ:"so",と:"to",の:"no",ほ:"ho",も:"mo",よ:"yo",ろ:"ro",を:"wo"
    };

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
        
        let copyOfElements = [...elements];

        // Delete the answer from the copy
        remove(draw, copyOfElements);

        // Get the 4 random choices by removing a drawn choice to make subsequent draws unique
        for (let j = 0; j < 4; j++) {
            let x = copyOfElements[Math.floor(Math.random()*copyOfElements.length)];
            
            // FIXME: quick bad hack for selections < 5 characters long
            if (x == null) {
                list += "-";
            } else {
                list += dictionary[x];
            }
            
            // Delete x from the copy
            remove(x, copyOfElements);

            if (j !== 3) {
                list += " ";
            }
        }

        let question = list.split(' ');

        // Replace an element of the list with the answer and include its position
        let position = Math.floor(Math.random()*question.length);
        question[position] = dictionary[draw];
        question[question.length] = position + 1;

        choices.push(question);

        list = "";
    }
}

function remove(x, arr) {
    let index = arr.indexOf(x);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

export default App;
