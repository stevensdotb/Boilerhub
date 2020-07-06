import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loaderSvg from '../../octocat-spinner-128.gif';
import moment from 'moment';
import numeral from 'numeral';
import languages from 'language-map';
// Octicons
import Octicon, {Repo, PrimitiveDot, ChevronDown, Check, Star} from '@primer/octicons-react';
import { ButtonGroup, ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';

import { loadAllBoilerplates, activateLoader } from '../../redux/actions/search';

import NotFound from '../../components/notFound/notfound';
import Paginator from '../../components/pagination/pagination';

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
        this.props.activateLoader();
        this.props.loadAllBoilerplates();
        
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

    /**
     * Number by commas format
     * @param {*} num 
     */
    formatNumber = (num) => {
        return !num ? 0 : num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    setPagination = (navigation) => {
        return (
            <Paginator navigation={navigation}></Paginator>
        )
    }

    sortBy = (option) => {
        this.setState(prevState => ({
            sort: {
                ...prevState.sort,
                value: option.value,
                text: <b>{option.text}</b>
            }
        }));
    }

    renderRepositoriesResult = (repositories) => {
        return repositories.map((repo, index) => {

            const language = languages[repo.language];
            const updated = moment(new Date(repo.updatedAt)).fromNow();
            const stargazers = numeral(repo.stargazers).format('0.0a');

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
                            <div className="_details d-flex align-items-center text-small text-gray">
                                <div className="mr-3">
                                    <span style={{color: '#55555'}}><Octicon icon={Star} className="mr-1"/></span>
                                    <span>{stargazers}</span>
                                </div>
                                {repo.language !== null ? (
                                    <div className="mr-3 d-flex align-items-center">
                                        <span className="language-dot" style={{color: !language || !language.color ? '#55555' : language.color}}>
                                            <Octicon icon={PrimitiveDot} size={25} className="mr-1"/>
                                        </span>
                                        <span>{repo.language}</span>
                                    </div>
                                ) : null}
                                <div className="mr-3">
                                    <span>Updated {updated}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
    }

    toggleLoader() {
        return this.props.loader 
            ? (<img src={loaderSvg} alt="Github Loader" width={35}/>) : null;
    }

    render() {
        const { repositories } = this.state;
        const totalCount = repositories && repositories.total_count ? this.formatNumber(repositories.total_count) : 0;

        return (
            <div>
                <div className="d-flex flex-column">
                    {/* Repositories results number and sort button */}
                    <div className="_results pb-3 pt-3">
                        <ButtonToolbar className="justify-content-between align-items-center btn-sm" aria-label="Toolbar with Button groups">
                            <h3>{totalCount} repositories result</h3>
                            {this.toggleLoader()}
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
                    {repositories && repositories.nav ? (
                        <div className="_pagination mx-auto mt-3">
                            {this.setPagination(repositories.nav)}
                        </div>
                    ) : null}

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.search,
        repositories: state.search.repositories,
        loader: state.search.loader
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadAllBoilerplates, activateLoader}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesListContainer);