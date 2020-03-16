import React, { Component } from 'react';
import './repositoriesList.css';
import '../../css/languages-dots.css';
// Octicons
import Octicon, {Repo, PrimitiveDot, ChevronDown, Check} from '@primer/octicons-react';
import { ButtonGroup, ButtonToolbar, DropdownButton, Dropdown, Pagination} from 'react-bootstrap';

class RepositoriesList extends Component {

    progLangDot = [
        {language: 'c', className: 'c-dot'},
        {language: 'c++', className: 'cplus-dot'},
        {language: 'html', className: 'html-dot'},
        {language: 'javascript', className: 'javascript-dot'},
        {language: 'java', className: 'java-dot'},
        {language: 'php', className: 'php-dot'},
        {language: 'python', className: 'python-dot'},
        {language: 'shell', className: 'shell-dot'},
        {language: 'typescript', className: 'typescrpt-dot'},
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
            sort: {value: '', text: <b>Best match</b>}
        }
    }


    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
        this.setState(prevState => ({
            sort: {
                ...prevState.sort,
                value: option.value,
                text: <b>{option.text}</b>
            }
        }));
    }

    renderRepositoriesResult = () => {
        return Array.from({length: 15}, () => Math.floor(Math.random() * 15))
            .map((item, index) => {
                return (
                    <li class="_item d-flex py-4" key={index}>
                        <div class="flex-shrink-0 mr-2">
                            <Octicon icon={Repo}/>
                        </div>
                        <div class="_info">
                            <div class="_link">
                                <a href="javascript:void(0)">django/<b>django</b></a>
                            </div>
                            <p class="_description">The Web framework for perfectionists with deadlines.</p>
                            <div class="_details d-flex text-small text-gray">
                                <div class="mr-3">
                                    <Octicon icon={PrimitiveDot} className={this.progLangDot[Math.floor(Math.random()*this.progLangDot.length)].className}/> Python
                                </div>
                                <div class="mr-3">
                                    Updated 3 hours ago
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
    }

    render() {
        return (
            <section class="boilerhub-repositories">
                <div class="d-flex flex-column">
                    {/* Repositories results number and sort button */}
                    <div class="_results pb-3 pt-3">
                        <ButtonToolbar className="justify-content-between align-items-center btn-sm" aria-label="Toolbar with Button groups">
                            <h3>{this.formatNumber(610793)} repositories result</h3>
                            <ButtonGroup aria-label="First group" className="_sort position-relative">
                                
                                <Octicon className="octicon position-absolute" icon={ChevronDown}/>
                                <DropdownButton variant="light" size="sm" as={ButtonGroup} title={['Sort: ', this.state.sort.text]} alignRight id="bg-nested-dropdown">
                                    {
                                        this.sortOptions.map((option, index) => {
                                            return (
                                                <Dropdown.Item eventKey="1" onClick={() => this.sortBy(option)} key={index}>
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
                    <ul class="_list">
                        {this.renderRepositoriesResult()}
                    </ul>
                    <div className="_pagination mx-auto mt-3">
                        <Pagination size="md">
                            <Pagination.First />
                            <Pagination.Prev />
                            {this.setPagination()}
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>

                </div>
            </section>
        )
    }
}

export default RepositoriesList;