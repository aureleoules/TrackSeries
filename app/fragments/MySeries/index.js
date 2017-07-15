import React from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import RestClient from '../../services/RestClient';
import {Card, Button, Text, Image} from 'react-native-elements';
import Serie from '../../components/Serie';

class MySeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            series: []
        };
    }
    fetchSeries = (cb) => {
        RestClient.getSeries(series => {
            this.setState({series});
        });
    }
    componentDidMount() {
        this.fetchSeries();
    }
    renderItem({ item, index }) {
        return (
            <Serie myseries serie={item}/>
        );
    }
     _keyExtractor = (item, index) => item.imdbId;

    _onRefresh() {
        this.setState({refreshing: true});
        RestClient.getSeries(series => {
            this.setState({series});
            this.setState({refreshing: false});
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.series}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={["#194C73"]}
                        />
                    }
                />
                {this.state.series.length < 1 &&
                    <Text onPress={() => this.fetchSeries()} style={{marginTop: 15, fontSize: 18, fontFamily: "sans-serif-light", textAlign: "center"}}>You're following 0 tv shows.</Text>
                }
                <ActivityIndicator 
                    style={{alignSelf: 'center', marginTop: "60%"}}
                    animating={!this.state.series}
                    color="#194C73"
                    size={50}
                />
            </View>
        );
    }
}

export default MySeries;