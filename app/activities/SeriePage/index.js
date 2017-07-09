import React from 'react';
import {View, ScrollView, ActivityIndicator, Image, FlatList, TouchableOpacity, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TitleBar from '../../components/TitleBar';
import Episode from '../../components/Episode';
import RestClient from '../../services/RestClient';
import {Tile, Text} from 'react-native-elements';

class SeriePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            shortOverview: true,
            selectedSeason: 0
        };
    }
    componentWillMount() {
        const serieId = this.props.serieId;
        if(this.props.followedByUser) {
            RestClient.getFollowedSerie(serieId, serie => {
                console.log(serie);
                this.setState({serie});
                this.makeOverview();
            });        
        } else {
            RestClient.getSerie(serieId, serie => {
                console.log(serie);
                this.setState({serie});
                this.makeOverview();
            });
        }
    }
    selectSeason = index => {
        this.setState({selectedSeason: index})
    }
    renderSeason({ item, index }, ctx) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => ctx.selectSeason(item.seasonNumber - 1)}
                >
                <Image
                    source={{uri: item.poster}}
                    style={{width: 140, height: 202}}
                />
            </TouchableOpacity>
        );
    }
    renderEpisode({item, index}) {
        console.log(item);
        return(
            <Episode episode={item}/>
        );
    }

    makeOverview = () => {
        this.setState({serieOverview: this.state.serie.overview.substr(0,250) + "... \n\nTap to show more."});
    }

    getOverview = () => {
        if(this.state.shortOverview) {
            return this.state.serieOverview;
        } else {
            return this.state.serie.overview;
        }
    }  


     _keyExtractor = (item, index) => item.seasonNumber;
     _keyExtractor2 = (item, index) => item.number;

    render() {
        return(
            <View style={{flex: 1, paddingTop: 69}}>
                <TitleBar close title={this.props.serieName}/>
                <ScrollView>
                    {this.state.serie &&
                    <View>
                        <Tile
                            imageSrc={{uri: this.state.serie.images.fanart}}
                            activeOpacity={0.9}
                            title={this.state.serie.name}
                            titleStyle={{fontSize: 40, fontFamily:"Roboto", fontWeight: "100"}}
                            caption={this.getOverview()}
                            onPress={() => this.setState({shortOverview: false})}
                            featured
                        />
                        <FlatList
                            data={this.state.serie.seasons}
                            horizontal={true}
                            renderItem={({ item, index }) => this.renderSeason({ item, index }, this)}
                            keyExtractor={this._keyExtractor}

                        />
                        <Text style={{textAlign: "center", fontSize: 35, fontFamily: "sans-serif-light", margin: 10}}>Season {this.state.selectedSeason + 1}</Text>
                        
                        <FlatList
                            data={this.state.serie.seasons[this.state.selectedSeason].episodes}
                            renderItem={({item, index}) => this.renderEpisode({item, index})}
                            keyExtractor={this._keyExtractor2}
                        />
                    </View>
                    }
                    {!this.state.serie && <ActivityIndicator 
                        style={{alignSelf: 'center', paddingTop: "60%"}}
                        animating={!this.state.serie}
                        color="#194C73"
                        size={50}
                    />}
                </ScrollView>
            </View>
        );
    }
}
const styles ={
    list: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10,
        width: 100,
        height: 100
    }
};

export default SeriePage;