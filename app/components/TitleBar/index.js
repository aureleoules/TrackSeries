import React from 'react';
import {Header} from 'react-native-elements';
import {View, Image} from 'react-native';

// Create Image Component
class logo extends React.Component {
    render() {

    } 
}

const Logo = () => {
    return (
        <Image
        style={{width: 177, height: 33}}
        source={{uri: 'https://www.trackseries.tv/images/trackseries_logo_transparent_white.eb0d5a48.png'}}
        />
    );
}

class TitleBar extends React.Component {
    render() {
        return(
            <Header
            backgroundColor="#194C73"
            centerComponent={<Logo/>} 
            />
        );
    }
}

export default TitleBar;