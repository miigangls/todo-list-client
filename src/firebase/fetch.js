import { auth, db} from './config';

// Register new user 
export async function register(name, email, password) {
    const newUser = await auth.createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
        displayName : name
    })
}

// User login
export async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Close the user session
export async function closeSession() {
    await auth.signOut();
}

/**
 * 
 * @param {*} param0 
 */
export async function fetchTaskList({userId, order}) {
    return  await new Promise ((resolve, reject)=> {
        db.collection("tasks-list").where("userId", "==", userId).onSnapshot(function(querySnapshot) {
            let data = [], key = 1
            if(!querySnapshot.length) resolve({message: "ok", data})
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    data.push({key, id: doc.id, ...doc.data()})
                    key++
                } 
                resolve({message: "ok", data})
            })
        })
    }).catch(e => {
        console.log("No such document!", e);
    })
}

/**
 * 
 * @param {*} params 
 */
export async function fetchAddTask(params) {
    return  await new Promise ((resolve, reject)=> {
        db.collection("tasks-list").add({...params})
        .then(function(docRef) {
            resolve({message: "ok", data: {id: docRef.id, ...params}})
        })
        .catch(function(e) {
            resolve({error: `Error adding document: ${e}`})
        });
    })
}


/**
 * 
 * @param {*} param0 
 */
export async function fetchDeleteTask({id}) {
    return  await new Promise ((resolve, reject)=> {
        db.collection("tasks-list").doc(id).delete()
        .then((docRef) => {
            resolve({message: "ok", data: {id}})
        })
        .catch((error) => {
            resolve({error: `Error adding document: ${error}`})
        });
    })
}

/**
 * 
 * @param {*} params 
 */
export async function fetchCompleteTask(params) {
    return  await new Promise ((resolve, reject)=> {
        let {id} = params
        delete params.id
        db.collection("tasks-list").doc(id).set(params)
        .then((docRef) => {
            resolve({message: "ok", data: {id}})
        })
        .catch((error) => {
            resolve({error: `Error adding document: ${error}`})
        });
    })
}
/**
 * 
 * @param {*} params 
 */
export async function fetchActiveTask(params) {
    return  await new Promise ((resolve, reject)=> {
        let {id} = params
        delete params.id
        db.collection("tasks-list").doc(id).set(params)
        .then((docRef) => {
            resolve({message: "ok", data: {id}})
        })
        .catch((error) => {
            resolve({error: `Error adding document: ${error}`})
        });
    })
}



/**
 * 
 * @param {*} params 
 */
export async function fetchByLabels({userId}) {
    return  await new Promise ((resolve, reject)=> {
        db.collection("labels").where("userId", "==", userId).onSnapshot(function(querySnapshot) {
            let data = []
            if(!querySnapshot.length) resolve({message: "ok", data})
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    data.push({id: doc.id, data: {...doc.data()}})
                    resolve({message: "ok", data})
                } else {
                    resolve({message: "ok", data})
                    console.log("No such document!");
                }
            })
        })
    }).catch(e => {
        console.log("No such document!", e);
    })
}