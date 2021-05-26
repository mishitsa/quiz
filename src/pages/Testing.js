import React, { useContext, useEffect } from 'react'
import { Loader } from '../components/Loader'
import { Tests } from '../components/Tests'
import { DbContext } from '../context/db/DbContext'

function Testing() {
    const { loading, tests, fetchTests } = useContext(DbContext)
    useEffect(() => {
        fetchTests()
        
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            {loading ?
            
                <Loader />
                : <Tests tests={tests} />
            }
        </div>
    )
}

export default Testing