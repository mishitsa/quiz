import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export const Tests = ({ tests }) => {
    if (tests) {
        return (
            <div className="tests">
                {console.log(tests.map(t => t))}
                <h1 className="display-3 text-info">Choose the test</h1>
                {tests.map(test => (
                    <Fragment
                        key={test.id}>
                        <NavLink to={`/questioning/${test.name}`} >
                            <div className="jumbotron jumbotron-fluid"
                                key={test.id}>
                                <div className="container">
                                    <h1 className="display-4">{test.name}</h1>
                                    <p className="lead">{test.description}</p>

                                </div>
                            </div>

                        </NavLink>
                    </Fragment>
                ))}
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}