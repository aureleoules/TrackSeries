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
    }
}

export default AuthService;