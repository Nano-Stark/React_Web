import API from '../../utils/api';

export const login = (email, pass) => {
    //dispact action
    return (dispatch) => {
        console.log(API);
        API.login(email, pass, res => {
            console.log('RESULT IS ', res.data);
            dispatch({
                type: 'LOGIN',
                payload: {
                    email: email,
                    token: res.data.id,
                    userId: res.data.userId
                
                }
            })
            API.getUser(res.data.userId, res.data.id, res2 => {
                dispatch({
                    type: 'AFTER_LOGIN',
                    payload: res2.data
                })
            })
        })
    }
    /*
    return {
        type: 'LOGIN',
        payload: {email, pass}
    }*/
}

export const register = (name, email, pass) => {
    return dispatch => {
        API.register(name, email, pass, res => {
            console.log("RES", res);
            if(res.status === 200){
                dispatch(login(email, pass));
            }else{
                if(res){
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: 'There was error. the email already exist'
                    })
                }
            }
        })
    }
    
    /*{
        type: 'REGISTER',
        payload: {name, email, pass}
    }*/
}