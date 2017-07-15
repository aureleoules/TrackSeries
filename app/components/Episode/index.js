import React from 'react';
import {Card, Text, Button, Tile} from 'react-native-elements';
import RestClient from '../../services/RestClient';

class Episode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconName: "eye"
        }
    }

    toggleWatchEpisode = () => {
        if(this.props.episode.watched) {
            RestClient.unwatchEpisode(this.props.episode.id, response => {
                this.props.refreshEpisodes();
            });
        } else {
            RestClient.watchEpisode(this.props.episode.id, response => {
                this.props.refreshEpisodes();
            });
        }    
    }

    getIcon = () => {
        return this.props.episode.watched === true ? "eye-slash" : "eye";
    }

    render() {
        const item = this.props.episode;
        return (
            <Tile
                activeOpacity={0.8}
                imageSrc={{uri:item.image}}
                title={item.title}
                titleStyle={{fontFamily: "sans-serif-thin"}}
                caption={"S" + ("0" + item.seasonNumber).slice(-2) + "E" + ("0" + item.number).slice(-2)}
                featured
                icon={{name: this.getIcon(), type: "font-awesome", color:"#fafafa", size: 40}}
                onPress={() => {this.toggleWatchEpisode()}}
            />
        );
    }
}
export default Episode;