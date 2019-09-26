import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap-pulse.css';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mx-auto mb-0 h1">Hiragana Quiz Application</span>
            </nav>
        );
    }
}

export default Nav;