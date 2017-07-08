import React from 'react';
import {Card, Button, Text, Image, Divider, Icon} from 'react-native-elements';
import {View} from 'react-native';
import RestClient from '../../services/RestClient';

class Serie extends React.Component {

    constructor(props) {
        super(props);
    }

    followSerie = serieID => {
        RestClient.followSerie(this.props.serie.tvdbId, response => {
            console.log(response);
            console.log(this.props.getSeries());;
        });
    }

    getMiddleComponent = () => {
        if(this.props.myseries) {
            return (
                <View>
                    <Text style={styles.serieInfoText}>{this.props.serie.progress.numEpisodesWatched}/{this.props.serie.progress.numEpisodesAired}</Text>
                    <Text style={styles.subInfoText}>Episodes</Text>
                </View>
            );
        }
        if(this.props.serie.followedByUser) {
            return(
                <View style={styles.followView}>
                    <Icon type='font-awesome' iconStyle={styles.icon} name='check' />
                    <Text style={styles.subInfoText}>Following</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.followView}>
                    <Icon type='font-awesome' iconStyle={styles.icon} name='plus' 
                        onPress={() => {this.followSerie()}}    
                    />
                    <Text style={styles.subInfoText}>Follow</Text>
                </View>
            );
        }
    }

    render() {
        return(
            <Card
                titleStyle={styles.serieTitle}
                title={this.props.serie.name}
                image={{uri:this.props.serie.images.fanart}}>
            <Text style={{marginBottom: 10}}>
                {this.props.serie.overview}
            </Text>
                <View style={styles.serieInfoContainer}>
                    <View>
                        <Text style={styles.serieInfoText}>{this.props.serie.firstAired.substring(0, 4)}</Text>
                        <Text style={styles.subInfoText}>Year</Text>
                    </View>
                    {this.getMiddleComponent()}
                    <View>
                        <Text style={styles.serieInfoText}>{this.props.serie.country.toUpperCase()}</Text>
                        <Text style={styles.subInfoText}>Country</Text>
                    </View>
                </View>
            </Card>
        )
    }
}
const styles = {    
    serieTitle:{
        fontFamily: "sans-serif-thin",
        fontSize: 22
    },
    serieInfoText:{
        fontSize: 30, 
        fontFamily: "sans-serif-light",
        color: "#98a6ad"
    },
    serieInfoContainer:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent:"space-between",
        padding: 5
    },
    icon: {
        fontSize: 40, 
        color: "#98a6ad"
    },
    followView:{
        marginRight: 15
    },
    subInfoText: {
        color: "#98a6ad",
        textAlign: "center"
    }
}
export default Serie;