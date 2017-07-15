import React from 'react';
import {View, Text, TextInput, ScrollView, FlatList} from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements'
import RestClient from '../../services/RestClient';
import Serie from '../../components/Serie';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    searchQuery = () => {
        if(this.state.query) {
            RestClient.searchSerie(this.state.query, series => {
                console.log(series);
                this.setState({series});
            });
        }
    }
    renderItem({ item, index }, context) {
        return (
            <Serie minimal serie={item} getSeries={context.searchQuery}/>
        );
    }
     _keyExtractor = (item, index) => item.id;
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <FormLabel>Search</FormLabel>
                    <TextInput style={{marginLeft: 15, marginRight: 15}} placeholder="Search tv shows..." onChangeText={query => this.setState({query})}/>
                    <Button
                        icon={{ type:"ionicon", name:'ios-search'}}
                        backgroundColor="#143E5E"
                        onPress={() => this.searchQuery()}
                        title='Search' />
                        {this.state.series && 
                            <FlatList
                                data={this.state.series}
                                renderItem={({item, index}) => this.renderItem({item, index}, this)}
                                keyExtractor={this._keyExtractor}
                            />
                        }
                    
                </ScrollView>
            </View>
        );
    }
}

export default Search;