import React from 'react';
import {View, FlatList} from 'react-native';
import {Card, Button, Text, Image} from 'react-native-elements';
import RestClient from '../../services/RestClient';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        RestClient.getUnwatchedEpisodes(response => {
            console.log(response);
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
                    

        // const cards = this.state.series[0].episodes.map((e, i) => {
        //     return(
        //         
        //     );
        // });
        // return cards;
    }

    renderItem({ item, index }) {
        console.log(item.serieName);
        return (
            <Card
                title={item.serieName + " | S" + ("0" + item.seasonNumber).slice(-2) + "E" + ("0" + item.number).slice(-2)}
                image={{uri:item.image}}>
            <Text style={{marginBottom: 10}}>
                {item.overview}
            </Text>
            <Button
            icon={{name: 'remove-red-eye'}}
            backgroundColor='#133E5F'
            fontFamily='Lato'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title="I've watched this." />
            </Card>
        );
    }
     _keyExtractor = (item, index) => item.imdbId;
    render() {
        return (
            <View>
                {/*{this.state.series && this.getCards()}*/}
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