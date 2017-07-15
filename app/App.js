import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import TitleBar from './components/TitleBar';
import Tabbar from './components/Tabbar';
import { Button } from 'react-native-elements'
import {AsyncStorage} from 'react-native';
import AuthService from './services/AuthService';
import Login from './activities/Login';
import Register from './activities/Register';
import {Scene, Router} from 'react-native-router-flux';
import SeriePage from './activities/SeriePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidMount() {
        AuthService.isAuthenticated(isAuth => {
            this.setState({isAuth});
        });
    }

    setLoggedIn = () => {
        this.setState({isAuth: true});
    }

    render() {
        return (
                // {/*<StatusBar backgroundColor="#154468"/>
                // <TitleBar/>
                // {this.state.isAuth && <Tabbar/>}
                // {this.state.isAuth == false && <Login setLoggedIn={this.setLoggedIn}/>}*/}
            <View style={{flex: 1, backgroundColor: "#F0F3F4"}}>
                <Router>
                    <Scene key="root">
                        <Scene key="home" hideNavBar component={Tabbar} title="TrackSeries" initial={true}/>
                        <Scene key="login" hideNavBar component={Login} title="Login"/>
                        <Scene key="register" hideNavBar component={Register} title="Register"/>
                        <Scene key="SeriePage" hideNavBar component={SeriePage} title="Serie"/>
                    </Scene>
                </Router>
            </View>
        );
    }
}

export default App;