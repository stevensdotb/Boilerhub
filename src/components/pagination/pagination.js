import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './pagination.css';
import PaginatorContainer from '../../redux/containers/pagination';

class Paginator extends Component {

  render() {
    return (
      <PaginatorContainer navigation={this.props.navigation}></PaginatorContainer>
    );
  }

}

Paginator.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Paginator;