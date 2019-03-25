let saveUser = async (name, email, password, address, dob) => {
    try {
        let response = {};
        response.name = name;
        response.email = email;
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getUser = async (id) => {
    console.log(id)
    let userDetails = {};
    try { if(id=='admin@test.ey.com'){
        
        userDetails.id = 1;
        userDetails.name = 'Abhinaba Das';
        userDetails.email = 'noreply@gds.ey.com';
        userDetails.role='admin'
    }
    if(id=='company@test.ey.com'){
       
        userDetails.id = 2;
        userDetails.name = 'Abhinaba Das';
        userDetails.email = 'noreply@gds.ey.com';
        userDetails.role='company'
    }
        return Promise.resolve(userDetails);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getUsers = async (id) => {
    try {
       
        let userDetailsList = [];
        let userDetails = {};
        userDetails.id = 1;
        userDetails.name = 'Abhinaba Das';
        userDetails.email = 'noreply@ey.com';
        userDetailsList.push(userDetails);
        userDetails = {};
        userDetails.id = 2;
        userDetails.name = 'Isabella';
        userDetails.email = 'noreply@us.ey.com';
        userDetailsList.push(userDetails);
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