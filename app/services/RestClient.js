import axios from 'axios';
import {AsyncStorage} from 'react-native';
import AuthService from './AuthService';

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
            console.log(err);
            cb("error");
            if(err) throw err;
        });
    },
    signUp: function(username, password, email, cb) {
        axios({
            method: "post",
            url: API_ENDPOINT + "/Account/Register",
            data: {
                email: email,
                username: username,
                confirmPassword: password,
                password: password
            },
            headers: {
                'apikey': apikey
            }
        }).then(response => {
            cb(response.data);
        }).catch(err => {
            console.log(err);
            if(err) cb("error");
        });
    },
    getUnwatchedEpisodes: function(cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'get',
                url: API_ENDPOINT + "/Follow/Episodes/Unwatched/follow",
                headers: {
                    'apikey': apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            })
        });
    },
    getSeries: function(cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'get',
                url: API_ENDPOINT + "/Follow/Series",
                headers: {
                    'apikey': apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            });
        });
    },
    getTopSeries: function(cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'get',
                url: API_ENDPOINT + "/Stats/TopSeries",
                headers: {
                    'apikey': apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            });
        });
    },
    followSerie: function(serieID, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'post',
                url: API_ENDPOINT + "/Follow/Series/" + serieID,
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                console.log(err);
                if(err) throw err;
            });
        });
    },
    unFollowSerie: function(serieID, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'delete',
                url: API_ENDPOINT + "/Follow/Series/" + serieID,
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            });
        });
    },
    getFollowedSerie: function(serieId, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'get',
                url: API_ENDPOINT + "/Follow/Series/" + serieId + "/extended",
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                console.log("err");
                cb("error");
            });
        })
    },
    getSerie: function(serieId, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: 'get',
                url: API_ENDPOINT + "/Series/" + serieId + "/all",
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                console.log("err");
                cb("error");
            });
        });
    },
    watchEpisode: function(episodeId, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: "post",
                url: API_ENDPOINT + "/Follow/Episodes/" + episodeId,
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            });
        });
    },
    unwatchEpisode: function(episodeId, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: "delete",
                url: API_ENDPOINT + "/Follow/Episodes/" + episodeId,
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            })
        })
    },
    searchSerie: function(query, cb) {
        AuthService.getAuthorizationToken(token => {
            axios({
                method: "get",
                url: API_ENDPOINT + "/Series/Search?query=" + query,
                headers: {
                    "apikey": apikey,
                    Authorization: "bearer " + token
                }
            }).then(response => {
                cb(response.data);
            }).catch(err => {
                if(err) throw err;
            });
        })
    },
    
}