import React from 'react'
import ReactDOM from 'react-dom'

//REACT PORTAL
//-> render from StreamDelete but under body element inside #modal div

const Modal = props => {

    //my custom way to remove modal but stay on same page onClick={closeModal} -> ui dimmer
    // const closeModal = () =>{
    //     document.querySelector('#modal').remove()
    // }

    //1st arg something to display, 2nd refference to element to render into
    return ReactDOM.createPortal(
        
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">

            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title} </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        
        </div>,

        document.querySelector('#modal')
    )
}


export default Modal