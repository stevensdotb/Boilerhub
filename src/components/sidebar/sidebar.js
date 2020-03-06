import React, { Component } from 'react';
import logo from './Logo-boilerhub.png';
import './sidebar.css';


class Sidebar extends Component {

    state = {
        lang: '',
        boilerplate: ''
    }

    /** 
     * Handle the http request to search boilerplates
     * repositories on GitHub
     */
    searchRepos = (event) => {
        event.preventDefault();
        console.log("Waiting to search repositories");
    }

    render() {
        return (
            <div className="boilerhub-side">
                <header>
                    <img src={logo} className="boilerhub-logo" alt="logo" />
                    <p>BoilerHub is a webb app for developers who are looking for a development base to start coding</p>
                </header>
                <div className="boilerhub-filter">
                    <form>
                        {/* Here will be the form structure*/}
                        <button onClick={this.searchRepos}>Search</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Sidebar;