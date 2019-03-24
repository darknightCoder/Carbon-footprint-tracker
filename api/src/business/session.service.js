let login = async (username, password) => {
    try {
        let response = {};
        let userType = {};
        userType.id = 1;
        userType.name = "Company";
        response.name = "Purifiers";
        response.email = "purifiers@nomail.com";
        response.username = username;
        response.userType = userType;
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
    login
};