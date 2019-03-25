import User from '../models/User';

let login = async (email, password) => {
    try {
        let response = {}
        await User.findOne({ email: email, password: password }, (err, obj) => {
            if(!err) {
               JSON.parse(JSON.stringify(obj))
               response = obj
            }         
        });        
        return Promise.resolve(response); 
    } catch (err) {
        return Promise.reject(err);
    }
};

let authorityLogin = async (email, password) => {
    try {
        let response = {};
        await User.findOne({ email: email, password: password }, (err, obj) => {
            if(!err) {
               JSON.parse(JSON.stringify(obj))
               response = obj
            }         
        });
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
    login,
    authorityLogin
};