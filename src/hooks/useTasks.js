import React, { useState, useEffect } from 'react';
import {fetchTaskList} from '../firebase/fetch';

const useTaskList = (props) => {
    const [useTasks, setTasks] = useState({message:'', data: []});
    const fetchTasks = async () => { 
        let data = await fetchTaskList(props)
        setTasks(data)
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    
    
    return {
        useTasks,
        fetchTasks
    }
}

export default useTaskList;