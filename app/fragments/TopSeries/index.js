import React from 'react';
import {View, FlatList} from 'react-native';
import RestClient from '../../services/RestClient';
import {Card, Button, Text, Image, Divider} from 'react-native-elements';

class TopSeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        RestClient.getTopSeries(series => {
            this.setState({series});
            console.log(series);    
        });
    }

    renderItem({ item, index }) {
        return (
            <Card
                title={item.name}
                image={{uri:item.images.fanart}}>
            <Text style={{marginBottom: 10}}>
                {item.overview}
            </Text>
            {/*<Divider style={{ backgroundColor: '#194C73' }} />*/}
            <View
                style={{paddingLeft: 15, paddingRight: 15, flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: 30}}>{item.firstAired.substring(0, 4)}</Text>
                <Button title="SUBSCRIBE"/>    
                <Text style={{fontSize: 30}}>{item.country.toUpperCase()}</Text>
            </View>
            </Card>
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

export default TopSeries;