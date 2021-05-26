import React from 'react'

 const Modal = ({active, setActive, goNext, setGoNext}) => {
    return (
        <div className={active ? "modal-active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <h2>Согласны ли вы?</h2>
                <button className="btn btn-primary button2" onClick={() => setGoNext(true)}> I agree </button>
            </div>
        </div>

    )
}

export default Modal