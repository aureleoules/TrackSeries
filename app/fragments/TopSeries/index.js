import React from 'react';
import {View, FlatList} from 'react-native';
import RestClient from '../../services/RestClient';
import Serie from '../../components/Serie';

class TopSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getSeries = this.getSeries.bind(this);
    }
    getSeries = () => {
        RestClient.getTopSeries(series => {
            this.setState({series});
            return true;
        });
    }
    componentDidMount() {
        this.getSeries();
    }
    
    renderItem({ item, index }, context) {
        return (
            <Serie serie={item} getSeries={context.getSeries}/>
        );
    }
     _keyExtractor = (item, index) => item.imdbId;
    
    render() {
        return (
            <View>
                {this.state.series && 
                <FlatList
                    data={this.state.series}
                    renderItem={({item, index}) => this.renderItem({item, index}, this)}
                    keyExtractor={this._keyExtractor}
                />
                }
            </View>
        );
    }
}

export default TopSeries;