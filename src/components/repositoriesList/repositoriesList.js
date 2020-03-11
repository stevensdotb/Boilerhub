import React, { Component } from 'react';
import './repositoriesList.css';
// Octicons
import Octicon, {Tools} from '@primer/octicons-react';


class RepositoriesList extends Component {

    render() {
        return (
            <div className="boilerhub-repositories">
                <div>
                    <p><Octicon icon={Tools}/></p>
                </div>
            </div>
        )
    }
}

export default RepositoriesList;