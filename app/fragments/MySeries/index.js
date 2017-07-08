import React from 'react';
import {View, FlatList} from 'react-native';
import RestClient from '../../services/RestClient';
import {Card, Button, Text, Image} from 'react-native-elements';
import Serie from '../../components/Serie';

class MySeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        RestClient.getSeries(series => {
            console.log(series);
            this.setState({series});
        });
    }
    renderItem({ item, index }) {
        return (
            <Serie myseries serie={item}/>
        );
    }
     _keyExtractor = (item, index) => item.imdbId;

    render() {
        return (
            <View>
                {this.state.series && 
                <FlatList
                    data={this.state.series}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                />
                }
            </View>
        );
    }
}

export default MySeries;