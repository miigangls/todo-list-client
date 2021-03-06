
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(value) {
    if(!value) {
        return  {error: true, message: "El Email es Obligatorio"}
    } else if( !re.test(value) ) {
        return {error: true, message: "Email no válido"}
    }

    return {error: false};
}


export function filter(data, value) {
    if(value !== 'all' && value !== '' ){
        data = data.filter(({status}) => status.toString() === value)
    }
    return data
}