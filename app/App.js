import React from 'react';
import {View, Text} from 'react-native';
import TitleBar from './components/TitleBar';
import Tabbar from './components/Tabbar';
class App extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar/>
                <Tabbar/>
            </View>
        );
    }
}

export default App;