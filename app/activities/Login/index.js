import React from 'react';
import TitleBar from '../../components/TitleBar';
import {View, Text} from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements'
import AuthService from '../../services/AuthService';
class Login extends React.Component {

    signIn = () => {
        AuthService.signIn(this.state.username.trim(), this.state.password.trim(), result => {
            if(result !== "error") {
                console.log("ok");
            } else {
                console.log("Wrong password!");
            }
        });
    }

    render() {
        return(
            <View style={{flex: 1, paddingTop: 70}}>
                <Text style={styles.textTitle}>Sign In</Text>
                <TitleBar/>
                <FormLabel>USERNAME OR EMAIL</FormLabel>
                <FormInput onChangeText={username => {this.setState({username})}} />
                <FormLabel>PASSWORD</FormLabel>
                <FormInput secureTextEntry={true} onChangeText={password => {this.setState({password})}} />
                <Button
                title='SIGN IN'
                large
                buttonStyle={{backgroundColor: "#0F334F", marginTop: 5}}
                onPress={() => this.signIn()}/>
                <View style={{marginTop: 15}}>
                    <Text style={styles.notMember}>Not a member?</Text>
                    <Button
                    title="CREATE AN ACCOUNT"
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
        marginRight: 15

    }
}

export default Login;