import axios from 'axios';
import {AsyncStorage} from 'react-native';

const API_ENDPOINT = "https://api.trackseries.tv/v1";
const apikey = "Webv2";
export default RestClient = {
    signIn: function(username, password, cb) {
        axios({
            method: 'post',
            url: API_ENDPOINT + '/Account/Login',
            data: {
                username: username,
                password: password,
                grant_type: "password"
            },
            headers: {
                'apikey': apikey
            }
        }).then(response => {
            cb(response);
        }).catch(err => {
            cb("error");
            if(err) throw err;
        });

    }
}