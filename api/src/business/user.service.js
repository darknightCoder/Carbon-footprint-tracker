import User from '../models/User';
import shell from 'shelljs';

let saveUser = async (name, email, password, role, org, channel) => {
    try {
        let response = {};
        let peers = [];
        peers.push('peer0.'+org+'.example.com');
        peers.push('peer1.'+org+'.example.com');
        response.name = name;
        response.email = email;
        response.password = password;
        response.role = role;
        response.org = org;
        response.channel = channel;
        response.peers = peers;
        try {
            shell.exec('/home/ubuntu/fabric-samples/first-network/dynamic-add-org.sh up '+org+' '+channel);

//          shell.exec('/home/ubuntu/fabric-samples/first-network/dynamic-add-org.sh up'+org+' '+channel);}
    }           catch(e) {
         console.log(e);
        }

        if(shellResponse == 1) {
            //DB persistance code to be moved here
        }
        else {
            return new Error("Failure to add organisation");
        }*/
        await User.create({ name: name, email: email, password: password, role: role, org: org, channel: channel, peers: peers }, (err, obj) => {
            if(!err) {
               JSON.parse(JSON.stringify(obj));               
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

let getUsers = async () => {
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