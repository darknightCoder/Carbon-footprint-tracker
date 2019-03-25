import User from '../models/User';

let saveUser = async (name, email, password, role) => {
    try {
        let response = {};
        response.name = name;
        response.email = email;
        response.password = password;
        response.role = role;
        await User.create({ name: name, email: email, password: password, role: role }, (err, obj) => {
            if(!err) {
               JSON.parse(JSON.stringify(obj));
               console.log(obj);
               response = obj;
            }
        });        
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getUser = async (id) => {    
    try {
        let userDetails = {};
        await User.findById(id, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));                
                userDetails = obj;
            }
        });
        return Promise.resolve(userDetails);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getUsers = async (id) => {
    try {       
        let userDetailsList = [];
        await User.find({}, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));
                userDetailsList = obj;
            }
        });
        return Promise.resolve(userDetailsList);
    } catch (err) {
        return Promise.resolve(err);
    }
};

export {
    saveUser,
    getUser,
    getUsers
};