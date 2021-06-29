import React from 'react'
import axios from 'axios';

export default function useFetch() {
    const [users, setUsers] = React.useState([]);
    const [page, setPage] = React.useState(localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(100);
    const [getAllUserLoading, setGetAllUserLoading] = React.useState(false);

    React.useEffect(() => {
        (async function () {
            setGetAllUserLoading(true);
            try {
                const {data:{users:fetchedUsers, totalUsers}} = await axios.get(`https://demo-mongod.herokuapp.com/api/user/getAll?page=${page}&page_size=${pageSize}`)
                setUsers([...fetchedUsers]);
                setTotalPages(totalPages => Math.floor((totalUsers+pageSize-1)/pageSize))
                setGetAllUserLoading(false)

                console.log("FETCHED USERS ============================ ", fetchedUsers);
                
            } catch (error) {
                setGetAllUserLoading(false)
            }
        })()
    },[page, pageSize, setGetAllUserLoading])

    return {users, page, setPage, pageSize, setPageSize, totalPages, getAllUserLoading};
}
