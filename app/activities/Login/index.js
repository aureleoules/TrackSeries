import React from 'react';
import TitleBar from '../../components/TitleBar';
import {View, Text, ToastAndroid} from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements'
import AuthService from '../../services/AuthService';
import { Actions } from 'react-native-router-flux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    signIn = () => {
        if(!this.state.username || !this.state.password) {
            ToastAndroid.show('Please provide your informations.', ToastAndroid.LONG);
        } else {
            AuthService.signIn(this.state.username.trim(), this.state.password.trim(), result => {
                if(result !== "error") {
                    AuthService.saveToken(result.data.access_token);
                    Actions.home({type: 'replace'});
                } else {
                    ToastAndroid.show('Wrong password.', ToastAndroid.LONG);
                }
            });
        }
    }

    goToRegister = () => {
        Actions.register({type: "push"});
    }
    render() {
        return(
            <View style={{flex: 1, paddingTop: 69}}>
                <Text style={styles.textTitle}>Sign In</Text>
                <TitleBar logo/>
                <FormLabel>USERNAME OR EMAIL</FormLabel>
                <FormInput onChangeText={username => {this.setState({username})}} />
                <FormLabel>PASSWORD</FormLabel>
                <FormInput secureTextEntry={true} onChangeText={password => {this.setState({password})}} />
                <Button
                    title='SIGN IN'
                    large
                    buttonStyle={{backgroundColor: "#0F334F", marginTop: 5}}
                    icon={{type:"font-awesome", name:'sign-in'}}
                    onPress={() => this.signIn()}/>
                    
                <View style={{marginTop: 15}}>
                    <Text style={styles.notMember}>Not a member?</Text>
                    <Button
                        title="CREATE AN ACCOUNT"
                        onPress={() => this.goToRegister()}
                        butonStyle={{backgroundColor: "#0F334F"}}
                    />
                </View>
            </View>
        );
    }
}
const styles = {
    textTitle: {
        fontSize: 30,
        textAlign: "center",
        color: "#58666e"
    },
    notMember: {
        color: "#98a6ad",
        textAlign: "center",
        marginRight: 15,
        marginBottom: 5
    }
}

export default Login;