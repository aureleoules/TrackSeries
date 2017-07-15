import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Card, Button, Text, Image} from 'react-native-elements';
import RestClient from '../../services/RestClient';
import Episode from '../../components/Episode';
import AuthService from '../../services/AuthService';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }
    componentDidMount() {
        AuthService.isAuthenticated(isAuth => {
            if(isAuth) {
                this.getEpisodes();
            }
        });
    }
    makeEpisodes = () => {
        var episodes = [];
        console.log(this.state.series);
        for(var i = 0; i < this.state.series.length; i++) {
            console.log(this.state.series[i].episodes.length);
            for(var y = 0; y < this.state.series[i].episodes.length; y++) {
                episodes.push(this.state.series[i].episodes[y]);
            }
        }
        this.setState({episodes: episodes});
        return episodes;
    }

    getEpisodes = () => {
        RestClient.getUnwatchedEpisodes(response => {
            this.setState({series: response}, () => {
                this.setState({refreshing: false});
                this.makeEpisodes();
            });
        });
    }

    renderItem({ item, index }, ctx) {
        return (
            <Episode episode={item} refreshEpisodes={this.getEpisodes}/>
        );
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getEpisodes();
    }

    _keyExtractor = (item, index) => item.id;

    getEmptyEpMessage = () => {
        if(this.state.episodes) {
            if(this.state.episodes.length < 1) {
                return (
                    <Text onPress={() => this.getEpisodes()} style={{textAlign: "center", margin: 15, fontFamily: "sans-serif-light", fontSize: 24}}>{'Please start following a TV show. You can search TV shows or see the top TV shows in our network. \nHave fun!'}</Text>
                )
            }
        }
    }

    render() {
        return (
            <View>
                {this.state.episodes && 
                <FlatList
                    data={this.state.episodes}
                    renderItem={({item, index}) => this.renderItem({item, index}, this)}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={["#194C73"]}
                        />
                    }
                />
                }
                {this.getEmptyEpMessage()}
            </View>
        );
    }
}

export default Home;