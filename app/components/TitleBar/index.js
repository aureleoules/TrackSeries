import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {View, Image, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';

class TitleBar extends React.Component {
    getLeftComponent = () => {
        if(this.props.close) {
            return (
                <Icon name="times" onPress={() => Actions.pop()} type="font-awesome" size={32} color="#fafafa"/> 
            );
        }
    }

    getCenterComponent = () => {
        if(this.props.logo) {
            return (
                <Image
                    style={{width: 177, height: 33}}
                    source={{uri: 'https://www.trackseries.tv/images/trackseries_logo_transparent_white.eb0d5a48.png'}}
                />
            )
        } else if(this.props.title) {
            return(
                <Text style={{color: "#fff", fontSize: 26,fontFamily: "sans-serif-light"}}>{this.props.title}</Text>
            );
        }
    }
    render() {
        return(
            <Header
                leftComponent={this.getLeftComponent()}
                backgroundColor="#194C73"
                centerComponent={this.getCenterComponent()} 
            />
        );
    }
}

export default TitleBar;