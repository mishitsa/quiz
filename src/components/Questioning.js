import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { DbContext } from '../context/db/DbContext'
import Modal from './Modal'
import { Questions } from './Questions'


const Questioning = (title) => {
    const { questions, fetchQuestions } = useContext(DbContext)

    const [show, setShow] = useState(true);
    const [goNext, setGoNext] = useState(false);

    useEffect(() => {
        fetchQuestions(title)
        //eslint-disable-next-line
    }, [])
    if (questions) {
        return (
            <div className="abc">
                {goNext ?
                    <Questions questions={questions} title={title} />
                    :
                    show ?
                        <Modal active={show} setActive={setShow} next={goNext} setGoNext={setGoNext} />
                        : <Redirect to="/testing" />
                }
            </div>
        )
    }
    return(
        <div></div>
    )
}

export default Questioning