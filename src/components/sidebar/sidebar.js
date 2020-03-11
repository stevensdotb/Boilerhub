import React, { Component } from 'react';
import logo from '../../Logo-boilerhub.png';
import './sidebar.css';

// React-Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Octicons
import Octicon, {ChevronDown ,MarkGithub} from '@primer/octicons-react';


class Sidebar extends Component {

    languages = ['Javascript', 'Python', 'Java', 'PHP'];
    
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            languages: [],
            boilerplate: '',
            // Language Dropdown
            activeDropdown: false
        }
    }

    /**
     * Toggle the Language select dropdown
     */
    toggleDropdown() {
        this.setState({ activeDropdown: !this.state.activeDropdown});
        console.log(this.state.activeDropdown);
    }

    pickLanguage(language) {
        this.setState({ language: language });
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
                <div>
                    <header>
                        <img src={logo} className="boilerhub-logo" alt="logo" />
                        <p>BoilerHub is a web app for developers who are looking for a development base to start coding.</p>
                    </header>
                    <div className="boilerhub-filter">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                {/* Language input */}
                                <Form.Label>Pick a Language</Form.Label>
                                {/* Select Languages dropdown */}
                                <div className="select-lenguage-input" onClick={()=>this.toggleDropdown()}>
                                    <div className="select-text">
                                        <div>{ !this.state.language
                                                ? <span className="placeholder">(Optional)</span>
                                                : <span>{this.state.language}</span>
                                            }
                                        </div>
                                        <div>
                                            <span><Octicon icon={ChevronDown}/></span>
                                        </div>
                                    </div>
                                    <div className={`select-dropdown ${!this.state.activeDropdown ? 'close' : 'open'}`}>
                                        {this.languages.map(language => {
                                            return <div onClick={() => this.pickLanguage(language)}>{language}</div>
                                        })}
                                    </div>
                                </div>
                                {/* Boilerplate input */}
                                <Form.Label>Enter the Boilerplate tool you need</Form.Label>
                                <Form.Control type="text" placeholder="React" />
                            </Form.Group>
                            <Button variant="success" onClick={this.searchRepos}>Search</Button>
                        </Form>
                    </div>
                    <div className="footer">
                        <small>
                            <a href="https://github.com/stevensdotb/boilerhub"><Octicon icon={MarkGithub}/>Fork me</a>
                        </small>
                        <small>
                            <a href="https://developer.github.com/v3/">GitHub API v3</a>
                        </small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;