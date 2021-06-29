import React from 'react'
import useFetch from './useFetch'
import useUpdate from './useUpdate';
import UpdateForm from './UpdateForm';

export default function UserList() {
    const {users, page, setPage, pageSize, setPageSize, totalPages, getAllUserLoading} =  useFetch();
    const {onClickSelectAll,onClickSelectHandler, selected, onClickUpdatedHandler, isUnemployed, setIsUnemployed, isUpdateLoading} = useUpdate();

    const [openModal, setOpenModal] = React.useState(false);

    const previousPage = () => {
        if(page-1 == 0) return
        setPage(page => page - 1);
        localStorage.setItem('page', (page-1));
    }

    const nextPage = () => {
        if(page + 1 > totalPages) return;
        setPage(page => page + 1);
        localStorage.setItem('page', (page+1));
    }

    const onClickToggleModalHandler = () => {
        setOpenModal(b => !b);
    }

    if(getAllUserLoading){
        return(
            <div style={{height: '100vh'}} className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
            )
    }

    return (
        <>
            {
                selected.length > 0 &&
                <div className="d-flex justify-content-end align-items-center">
                    <p>
                        Total selected users {selected.length}
                    </p>
                    <button onClick={onClickToggleModalHandler} className="btn btn-primary btn-sm">Edit</button>
                </div>

            }

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">
                        <div className="form-check">
                            <input 
                            checked={users.every(u => selected.includes(u._id))}
                            className="form-check-input" type="checkbox" onChange={(e) => onClickSelectAll(e,users)} />
                        </div>
                    </th>
                    <th scope="col">Sl.</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Job</th>
                    <th scope="col">Unemployed</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">updatedAt</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users?.map((user, _idx) => (
                        <tr key={user?._id}>
                            <th scope="row">
                                <div className="form-check">
                                    <input
                                    checked={selected.includes(user?._id)} 
                                    className="form-check-input" type="checkbox" onChange={onClickSelectHandler} value={user?._id} />
                                </div>
                            </th>
                            <th scope="row">{_idx + 1 + (page-1) * pageSize}</th>
                            <td>{user?.firstname}</td>
                            <td>{user?.lastname}</td>
                            <td>{user?.job}</td>
                            <td>{user?.unemployed ? 'Yes' : 'No'}</td>
                            <td>{new Date(user?.createdAt).toString().split("GMT")[0]}</td>
                            <td>{new Date(user?.updatedAt).toString().split("GMT")[0]}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p>Showing page {page} of {totalPages} pages</p>
                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={() => previousPage()}> Previous Page </button>
                    <button onClick={() => nextPage()}> Next Page </button>
                </div>
            </div>


            {
                openModal && 
                <UpdateForm
                    onClickUpdatedHandler={onClickUpdatedHandler}
                    setOpenModal={setOpenModal}
                    isUnemployed={isUnemployed}
                    setIsUnemployed={setIsUnemployed}
                    isUpdateLoading={isUpdateLoading}
                />
            }
        </>
    )
}
