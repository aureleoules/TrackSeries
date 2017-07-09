import React from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import RestClient from '../../services/RestClient';
import Serie from '../../components/Serie';

class TopSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }
    componentDidMount() {
        RestClient.getTopSeries(series => {
            this.setState({series});
        });
    }

    getSeries = () => {
        RestClient.getTopSeries(series => {
            this.setState({series});    
        });
    }
    
    renderItem({ item, index }, context) {
        return (
            <Serie serie={item} getSeries={context.getSeries}/>
        );
    }
     _keyExtractor = (item, index) => item.imdbId;

    _onRefresh() {
        this.setState({refreshing: true});
        RestClient.getTopSeries(series => {
            this.setState({series});
            this.setState({refreshing: false});    
        });
    }
    render() {
        return (
            <View>
                {this.state.series && 
                <FlatList
                    data={this.state.series}
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

export default TopSeries;