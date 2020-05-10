import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loaderSvg from '../../octocat-spinner-128.gif';
import moment from 'moment';
import languages from 'language-map';
// Octicons
import Octicon, {Repo, PrimitiveDot, ChevronDown, Check, Search, MarkGithub} from '@primer/octicons-react';
import { ButtonGroup, ButtonToolbar, DropdownButton, Dropdown, Pagination} from 'react-bootstrap';

import { loadAllBoilerplates } from '../../redux/actions/search';

import NotFound from '../../components/notFound/notfound';

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

    
    constructor(props) {
        super(props)
        this.state = {
            sort: {value: '', text: <b>Best match</b>},
            activateLoader: false,
            repositories: {}
        }
        this.props.searchAll();
        console.log(moment('2020-05-10T05:03:13Z').fromNow())
        
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
        // console.log(this.props);
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
            const language = languages[repo.language];
            const updated = moment(new Date(repo.updatedAt)).fromNow();
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
                                        <span style={{color: !language || !language.color ? '#55555' : language.color}}><Octicon icon={PrimitiveDot} className="mr-1"/></span>
                                        {repo.language}
                                    </div>
                                ) : null}
                                <div className="mr-3">
                                    Updated {updated}
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
    }

    toggleLoader() {
        return 
    }

    render() {
        console.log(this.props);
        const { loader } = this.props;
        const { repositories } = this.state;
        const totalCount = repositories && repositories.total_count ? this.formatNumber(repositories.total_count) : 0;

        return (
            <div>
                <div className="d-flex flex-column">
                    {/* Repositories results number and sort button */}
                    <div className="_results pb-3 pt-3">
                        <ButtonToolbar className="justify-content-between align-items-center btn-sm" aria-label="Toolbar with Button groups">
                            <h3>{totalCount} repositories result</h3>
                            {repositories && !repositories.items ? <img src={loaderSvg} alt="Github Loader" width={35}/> : null}
                            <ButtonGroup aria-label="First group" className="_sort position-relative">
                                
                                <Octicon className="octicon position-absolute" icon={ChevronDown}/>
                                <DropdownButton style={totalCount !== null && totalCount !== 0 ? {} : {pointerEvents: 'none', opacity: '0.6'}} variant="light" size="sm" as={ButtonGroup} title={['Sort: ', this.state.sort.text]} alignRight id="bg-nested-dropdown">
                                    {
                                        this.sortOptions.map((option, index) => {
                                            return (<div key={index}>
                                                <Dropdown.Item eventKey={(index+1).toString()} onClick={() => this.sortBy(option)}>
                                                    { this.state.sort.value === option.value ? <Octicon className="octicon" icon={Check}/> : '' } <span>{option.text}</span>
                                                </Dropdown.Item></div>
                                            )
                                        })
                                    }
                                    
                                </DropdownButton>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                    {/* Repositories List */}
                    { !(repositories && repositories.total_count)
                         ? <NotFound></NotFound>
                         : <ul className="_list">
                            {this.renderRepositoriesResult(repositories.items)}
                           </ul>
                    }
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
        loader: state.search.loader
    }
};
const searchAll = () => (loadAllBoilerplates());
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchAll}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesListContainer);