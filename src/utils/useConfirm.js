import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const useConfirm = (callback, message, pTagShow = true) => {

    const showDialog = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    {pTagShow && <p>You want to delete this {message}?</p>}
                    {!pTagShow && <p>You want to <span className="text-warning">{message}</span> this invoice ?</p>}
                    <button onClick={onClose}>No</button>
                    <button
                        onClick={() => {
                            callback(onClose);
                        }}
                    >
                        { pTagShow ? 'Yes, Delete it!' : 'Yes' }
                    </button>
                </div>
              );
            }
        });
    }

    return {
        showDialog
    };
}

export default useConfirm;