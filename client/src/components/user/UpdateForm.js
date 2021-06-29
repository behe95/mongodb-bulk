import React from 'react'

export default function UpdateForm({onClickUpdatedHandler, setOpenModal, isUnemployed, setIsUnemployed, isUpdateLoading}) {
    
    return (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: 0,
            width: "320px",
            background: "#eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "translate(-50%,-50%)",
        }}>
            <form onSubmit={e => e.preventDefault()}>
                <label>Are they unemployed?</label>
                <select
                value={isUnemployed}
                onChange={e => setIsUnemployed(e.target.value)} 
                className="form-select" aria-label="Default select example">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <button onClick={() => onClickUpdatedHandler()} className="btn btn-primary btn-sm" disabled={isUpdateLoading}>
                    {
                        isUpdateLoading ? 
                        <>
                        <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only"></span> 
                        </div>
                        <span>Loading....</span>
                        </>
                        :
                        "Update"
                    }
                </button>
                <button onClick={() => setOpenModal(b => !b)} className="ml-2 btn btn-primary btn-sm" disabled={isUpdateLoading}>Close</button>
            </form>
        </div>
    )
}


