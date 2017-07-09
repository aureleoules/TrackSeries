import React from 'react';
import {Card, Text, Button, Tile} from 'react-native-elements';
class Episode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconName: "eye"
        }
    }
    render() {
        const item = this.props.episode;
        return (
            <Tile
                activeOpacity={0.8}
                contentContainerStyle={{margin: 10}}
                imageSrc={{uri:item.image}}
                title={item.title}
                titleStyle={{fontFamily: "sans-serif-thin"}}
                caption={"S" + ("0" + item.seasonNumber).slice(-2) + "E" + ("0" + item.number).slice(-2)}
                featured
                icon={{name: this.state.iconName, type: "font-awesome", color:"#fafafa", size: 40}}
                onPress={() => {this.setState({iconName: "eye-slash"})}}
            />
        );
    }
}
export default Episode;