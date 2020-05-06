import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import languages from 'language-map';
// Octicons
import Octicon, {Repo, PrimitiveDot, ChevronDown, Check, Search, MarkGithub} from '@primer/octicons-react';
import { ButtonGroup, ButtonToolbar, DropdownButton, Dropdown, Pagination} from 'react-bootstrap';

import { loadAllBoilerplates } from '../../redux/actions/search';

class RepositoriesListContainer extends Component {

    progLangDot = [
        {language: 'c', className: 'c-dot'},
        {language: 'c++', className: 'cplus-dot'},
        {language: 'html', className: 'html-dot'},
        {language: 'javascript', className: 'javascript-dot'},
        {language: 'java', className: 'java-dot'},
        {language: 'php', className: 'php-dot'},
        {language: 'python', className: 'python-dot'},
        {language: 'shell', className: 'shell-dot'},
        {language: 'typescript', className: 'typescript-dot'},
    ]

    sortOptions = [
        {value: '', text: 'Best match'},
        {value: 'stars', text: 'Most stars'},
        {value: 'forks', text: 'Most forks'},
        {value: 'updated', text: 'Recently Updated'},
    ]

    state = {
        sort: {value: '', text: <b>Best match</b>},
        repositories: {}
    }
    
    constructor(props) {
        super(props)
        
        this.props.searchAll();
    }

    async componentDidUpdate() {
        const { repositories } = this.props;
        const returnRepositories = await this.wrapper(repositories);
        if ( this.state.repositories !== returnRepositories ) {
            this.setState({ repositories: returnRepositories });
        }
    }

    async wrapper(data) {
        try {
            const dataTo = await data;
            return dataTo;
        } catch(error) {
            console.log(error);
        }
    }


    formatNumber = (num) => {
        return !num ? 0 : num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    setPagination = () => {
        let active = 2;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                {number}
                </Pagination.Item>,
            );
        }

        return items.map(item => (item));
    }

    sortBy = (option) => {
        console.log(this.props);
        this.setState(prevState => ({
            sort: {
                ...prevState.sort,
                value: option.value,
                text: <b>{option.text}</b>
            }
        }));
    }

    setLanguage() {
        return this.progLangDot[Math.floor(Math.random()*this.progLangDot.length)];
    }

    renderRepositoriesResult = (repositories) => {
        return repositories.map((repo, index) => {
            // const language =  this.progLangDot.find(obj => obj.language === repo.language.toLowerCase()); // this.randomLanguage();
            const language =  languages[repo.language];
            return (
                    <li className="_item d-flex py-4" key={index}>
                        <div className="flex-shrink-0 mr-2">
                            <Octicon icon={Repo}/>
                        </div>
                        <div className="_info">
                            <div className="_link">
                                <a href={repo.url}>{repo.full_name}</a>
                                {/* django/<b>django</b></a> */}
                            </div>
                            <p className="_description">{repo.description}</p>
                            <div className="_details d-flex text-small text-gray">
                                {repo.language !== null ? (
                                    <div className="mr-3">
                                        <span style={{color: !language.color ? '#55555' : language.color}}><Octicon icon={PrimitiveDot} className="mr-1"/></span>
                                        {/* <Octicon icon={PrimitiveDot} className={`mr-1 ${!language ? 'default-dot' : language.className}`}/> */}
                                        {repo.language}
                                        {/* {language.language.replace(/^\w/, c => c.toUpperCase())} */}
                                    </div>
                                ) : null}
                                <div className="mr-3">
                                    Updated 3 hours ago
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
    }

    render() {
        const { repositories } = this.state;
        console.log(repositories);
        const totalCount = repositories && repositories.total_count ? this.formatNumber(repositories.total_count) : 0;
        console.log(totalCount);
        return (
            <div>
                <div className="d-flex flex-column">
                    {/* Repositories results number and sort button */}
                    <div className="_results pb-3 pt-3">
                        <ButtonToolbar className="justify-content-between align-items-center btn-sm" aria-label="Toolbar with Button groups">
                            <h3>{totalCount} repositories result</h3>
                            <ButtonGroup aria-label="First group" className="_sort position-relative">
                                
                                <Octicon className="octicon position-absolute" icon={ChevronDown}/>
                                <DropdownButton style={totalCount !== null && totalCount !== 0 ? {} : {pointerEvents: 'none', opacity: '0.6'}} variant="light" size="sm" as={ButtonGroup} title={['Sort: ', this.state.sort.text]} alignRight id="bg-nested-dropdown">
                                    {
                                        this.sortOptions.map((option, index) => {
                                            return (
                                                <Dropdown.Item key={index} eventKey="1" onClick={() => this.sortBy(option)}>
                                                    { this.state.sort.value === option.value ? <Octicon className="octicon" icon={Check}/> : '' } <span>{option.text}</span>
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                    
                                </DropdownButton>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                    {/* Repositories List */}
                    {/* <div className="before-search-icon position-relative" style={{width: '100%'}}>
                        <span>
                            <Octicon className="octicon position-absolute" size={150} icon={Search}/>
                        </span>
                        <span style={{transform: 'translate(40px, 32px)'}}>
                            <Octicon className="octicon position-absolute" size={50} icon={MarkGithub}/>
                        </span>
                    </div> */}
                    <ul className="_list">
                        {repositories && repositories.items !== undefined ? this.renderRepositoriesResult(repositories.items) : 'It seems you have not search for repositories yet.'}
                    </ul>
                    {repositories && repositories.total_count && repositories.total_count > 15 ? (
                        <div className="_pagination mx-auto mt-3">
                            <Pagination size="md">
                                <Pagination.First />
                                <Pagination.Prev />
                                {this.setPagination()}
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    ) : null}

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        repositories: state.search.repositories,
    }
};
const searchAll = () => (loadAllBoilerplates());
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchAll}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesListContainer);