import React from 'react';
import './repositoriesList.css';
import '../../css/languages-dots.css';

import RepositoriesListContainer from '../../redux/containers/repositoriesList';

const RepositoriesList = () => {
    return (
        <div className="boilerhub-repositories">
            <RepositoriesListContainer/>
        </div>
    )
}

export default RepositoriesList;