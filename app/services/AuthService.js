import {AsyncStorage} from 'react-native';
import RestClient from './RestClient';

const AuthService = {
    signIn: function(username, password, cb) {
        RestClient.signIn(username, password, response => {
            cb(response);
        });
    },
    isAuthenticated: function(cb) {
        try {
            AsyncStorage.getItem('Authorization').then(token => {
                console.log(token);
                cb(!!token);
            });
        } catch (error) {
            if(error) throw error;
        }
    },
    getAuthorizationToken: function(cb) {
        try {
            AsyncStorage.getItem('Authorization').then(token => {
                cb(token);
            });
        } catch (error) {
            if(error) throw error;
        }
    },
    saveToken: function(token) {
        try {
            AsyncStorage.setItem('Authorization', token);
        } catch (error) {
            if(error) throw error;
        }
    },
    signOut: function() {
        try {
            AsyncStorage.setItem('Authorization', "");
        } catch (error) {
            console.log(error);
            if(error) throw error;
        }
    }
}

export default AuthService;