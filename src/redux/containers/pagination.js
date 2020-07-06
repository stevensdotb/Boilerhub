import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchBoilerplate, activateLoader } from '../actions/search';


class PaginatorContainer extends Component {
 
    /**
     * Load the next / prev url
     * @param {*} url 
     */
    loadUrl(url) {
        this.props.activateLoader();
        this.props.search(url);
    }
  
    render() {
        const nav = this.props.navigation;
        const nextUrl = nav.next ? nav.next : '';
        const prevUrl = nav.prev ? nav.prev : '';
        
        return (
            <Pagination size="md">
                <Pagination.Prev disabled={!nav.prev} onClick={() => this.loadUrl(prevUrl)}/>
                <Pagination.Item active={true} >
                <span className="page-number">{nav.currentPage} / {nav.totalPages}</span>
                </Pagination.Item>
                <Pagination.Next disabled={!nav.next} onClick={() => this.loadUrl(nextUrl)}/>
            </Pagination>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { navigation } = ownProps;
    return {
        navigation
    }
};

const search = (url) => searchBoilerplate(url);
const actLoader = () => (activateLoader()); // Activate loader

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({search, activateLoader}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatorContainer);