import React, { Component } from 'react';
import logo from '../../Logo-boilerhub.png';
import '../../components/sidebar/sidebar.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchBoilerplate, activateLoader } from '../actions/search';

// React-Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Octicons
import Octicon, {ChevronDown, MarkGithub} from '@primer/octicons-react';

import LanguagesData from '../../data/github_top_list_languages.json';


class SideBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tool: '',
            language: '',
            // Language Dropdown
            activeDropdown: false
        }        
        this.setBoilerplateTool = this.setBoilerplateTool.bind(this);
    }

    /**
     * Toggle the Language select dropdown
     */
    toggleDropdown() {
        this.setState({ activeDropdown: !this.state.activeDropdown});
    }
    /**
     * Load all programming languages
     */
    loadLanguages() {
        const languages = LanguagesData.map(lang => lang.name).sort((a, b) => a.localeCompare(b));
        return languages.map((language, index) => (<div key={index} onClick={() => this.pickLanguage(language)}>{language}</div>));
    }

    /**
     * Handle the language selection
     * @param language 
     */
    pickLanguage(language) {
        this.setState({ language });
    }

    /**
     * Handle the boilerplate tool writen by the user
     * @param {*} e 
     */
    setBoilerplateTool(e) {
        this.setState({ tool: e.target.value });
    }

    /** 
     * Handle the http request to search boilerplates
     * repositories on GitHub
     */
    searchRepos = () => {
        this.props.activateLoader();
        this.props.search(this.state.tool, this.state.language);

    }

    render() {
        return (
            <div>
                <header>
                    <img src={logo} className="boilerhub-logo" alt="logo" />
                    <p>BoilerHub is a web app for developers who are looking for a development base to start coding.</p>
                </header>
                <div className="boilerhub-filter">
                    <Form onSubmit={(e) => e.preventDefault()}>
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
                                    <div style={{backgroundColor: '#2B3137'}} onClick={() => this.pickLanguage('')}>[None]</div>
                                    {this.loadLanguages()}
                                </div>
                            </div>
                            {/* Boilerplate input */}
                            <Form.Label>Enter the Boilerplate tool you need</Form.Label>
                            <Form.Control type="text" placeholder="React" onChange={this.setBoilerplateTool}/>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
    }
};

const search = (tool, language) => (searchBoilerplate('', tool, language));

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({search, activateLoader}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);