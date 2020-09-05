import React from 'react'
import Octicon, {MarkGithub} from '@primer/octicons-react';
import './notFound.css'

function NotFound() {
    
    return (
        <div className="not-found-wrapper">
            <div className="not-found-logo">
                <Octicon className="octicon" size={100} icon={MarkGithub}/>
            </div>
            <p className="not-found-text text-center">
                <b>Oops!</b> It seems there is not repositories result
            </p>
        </div>
    )
}

export default NotFound