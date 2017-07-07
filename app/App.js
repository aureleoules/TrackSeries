import React from 'react';
import {View, Text} from 'react-native';
import TitleBar from './components/TitleBar';
import Tabbar from './components/Tabbar';
import { Button } from 'react-native-elements'
import {AsyncStorage} from 'react-native';
import AuthService from './services/AuthService';
import Login from './activities/Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidMount() {
        AuthService.isAuthenticated(isAuth => {
            console.log(isAuth);
            this.setState({isAuth});
        });

    }

    setLoggedIn = () => {
        this.setState({isAuth: true});
        console.log("logged in!");
    }

    removeToken = () => {
        AuthService.signOut();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar/>
                {this.state.isAuth && <Tabbar/>}
                {this.state.isAuth == false && <Login setLoggedIn={this.setLoggedIn}/>}
            </View>
        );
    }
}

export default App;