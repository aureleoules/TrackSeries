import React from 'react';
import {View, FlatList} from 'react-native';
import {Card, Button, Text, Image} from 'react-native-elements';
import RestClient from '../../services/RestClient';
import Episode from '../../components/Episode';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        RestClient.getUnwatchedEpisodes(response => {
            this.setState({series: response});
            this.makeEpisodes();
        });
    }
    makeEpisodes = () => {
        var episodes = [];
        const promises = Object(this.state.series).map((serie,i) => {
            serie.episodes.forEach((ep, i) => {
                episodes.push(ep);
            });
        });
        this.setState({episodes: episodes});
        return episodes;
    }

    renderItem({ item, index }) {
        return (
            <Episode episode={item}/>
        );
    }
     _keyExtractor = (item, index) => item.id;
    render() {
        return (
            <View>
                {this.state.series && 
                <FlatList
                    data={this.state.episodes}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                />
                }
            </View>
        );
    }
}

export default Home;