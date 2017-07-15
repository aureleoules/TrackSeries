import React from 'react';
import TitleBar from '../../components/TitleBar';
import {View, Text, ToastAndroid} from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements'
import AuthService from '../../services/AuthService';
import { Actions } from 'react-native-router-flux';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    signUp = () => {
        if(!this.state.username || !this.state.password || !this.state.email) {
            ToastAndroid.show('Please provide all the informations.', ToastAndroid.LONG);
        } else {
            AuthService.signUp(this.state.username.trim(), this.state.password.trim(), this.state.email.trim(), result => {
                console.log(result);
                if(result !== "error") {
                    ToastAndroid.show('Successfuly signed up. Please confirm your email address.', ToastAndroid.SHORT);
                    this.goToLogin();            
                } else {
                    ToastAndroid.show('Username or email already exists.', ToastAndroid.LONG);
                }
            });
        }
    }
    goToLogin = () => {
        Actions.login({type: "push"});
    }
    render() {
        return(
            <View style={{flex: 1, paddingTop: 69}}>
                <Text style={styles.textTitle}>Sign Up</Text>
                <TitleBar logo/>
                <FormLabel>USERNAME</FormLabel>
                <FormInput onChangeText={username => {this.setState({username})}} />
                <FormLabel>EMAIL</FormLabel>
                <FormInput onChangeText={email => {this.setState({email})}} />
                <FormLabel>PASSWORD</FormLabel>
                <FormInput secureTextEntry={true} onChangeText={password => {this.setState({password})}} />
                <Button
                    title='SIGN UP'
                    large
                    buttonStyle={{backgroundColor: "#0F334F", marginTop: 5}}
                    onPress={() => this.signUp()}/>
                    
                <View style={{marginTop: 15}}>
                    <Text onPress={() => this.goToLogin()} style={styles.notMember}>Already a member?</Text>
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

export default Register;