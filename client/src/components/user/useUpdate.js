import axios from 'axios';
import React from 'react'

export default function useUpdate() {
    const [selected, setSelected] = React.useState([]);
    const [isUnemployed, setIsUnemployed] = React.useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = React.useState(false);

    const onClickSelectAll = (e,users) => {
        if(e.target.checked){
            const ids = users.map(u => u._id);
            setSelected(totalSelected => [...totalSelected, ...ids.filter(_id => totalSelected.indexOf(_id) === -1)])
        }else{
            const ids = users.map(u => u._id);
            setSelected(totalSelected => totalSelected.filter(s => (ids.indexOf(s) === -1)))
        }
    }

    const onClickSelectHandler = (e) => {
        if(e.target.checked) return setSelected(s => [...s,e.target.value]);

        setSelected(totalSelected => totalSelected.filter(s => s != e.target.value));

    }
    const onClickUpdatedHandler = async (e) => {
        setIsUpdateLoading(true);
        try {
            const res = await axios.patch('http://localhost:5000/api/user/update',{selected, isUnemployed});
            setIsUpdateLoading(false);
            alert(res.data.message)
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('Failed to update ',error.message);
            setIsUpdateLoading(false);
        }
        
    }

    return {
        selected,
        isUnemployed,
        setIsUnemployed,
        onClickSelectHandler,
        onClickUpdatedHandler,
        onClickSelectAll,
        isUpdateLoading
    }
}
