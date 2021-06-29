import React from 'react'
import axios from 'axios';

export default function useFetch() {
    const [users, setUsers] = React.useState([]);
    const [page, setPage] = React.useState(localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(100);
    const [getAllUserLoading, setGetAllUserLoading] = React.useState(false);
    const [filter, setFilter] = React.useState(localStorage.getItem('filter') ? localStorage.getItem('filter') : "all");

    React.useEffect(() => {
        (async function () {
            setGetAllUserLoading(true);
            try {
                const {data:{users:fetchedUsers, totalUsers}} = await axios.get(`http://localhost:5000/api/user/getAll?page=${page}&page_size=${pageSize}&filter=${filter}`)
                setUsers([...fetchedUsers]);
                setTotalPages(totalPages => Math.floor((totalUsers[0]?.count+pageSize-1)/pageSize))
                setGetAllUserLoading(false)

                console.log("FETCHED USERS ============================ ", totalUsers);
                
            } catch (error) {
                setGetAllUserLoading(false)
            }
        })()
    },[page, pageSize,filter, setGetAllUserLoading])

    return {users, page, setPage, pageSize, setPageSize, totalPages, getAllUserLoading, filter, setFilter};
}
