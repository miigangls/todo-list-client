import { useState, useEffect } from 'react';
import {fetchTaskList} from '../firebase/fetch';

const useTaskList = (props) => {
    const [useTasks, setTasks] = useState({message:'', data: []});

    const fetchTasks = async () => {
        let data = await fetchTaskList(props)
        setTasks(data)
    }

    useEffect(() => {
        fetchTasks()
    }, [useTasks.data.length]);
    
    
    return {
        useTasks,
        fetchTasks
    }
}

export default useTaskList;