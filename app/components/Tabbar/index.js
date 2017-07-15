import React from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {View, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Tabs, Tab } from 'react-native-elements';
import { Icon } from 'react-native-elements'

import TitleBar from '../TitleBar';
import Home from '../../fragments/Home';
import MySeries from '../../fragments/MySeries';
import TopSeries from '../../fragments/TopSeries';
import Settings from '../../fragments/Settings';
import AuthService from '../../services/AuthService';
import Search from '../../fragments/Search';

class Tabbar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'home',
        }
    }
    changeTab = selectedTab => this.setState({selectedTab});

    componentDidMount() {
        AuthService.isAuthenticated(isAuth => {
            console.log(isAuth);
            if(!isAuth) {
                Actions.login();
            }
        });
    }
    logOut = () => {
        AuthService.signOut(() => {
            Actions.login({type: 'push'});
        });
    }
    askLogOutConfirmation = () => {
        Alert.alert(
            'Signing out',
            'Are you sure you want to do this?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Sign me out!', onPress: () => this.logOut()},
            ],
            { cancelable: true }
            )
    }

    render() {
        const {selectedTab} = this.state;
        const tabBarHeight = 50;

        return (
            <View style={{flex: 1}}>
                <TitleBar logo/>
                <Tabs tabBarStyle={{backgroundColor: "#fafafa"}} sceneStyle={{paddingTop: 69, marginLeft: 0, marginRight: 0}}>
                <Tab
                    titleStyle={styles.title}
                    selectedTitleStyle={styles.selectedTitle}
                    selected={selectedTab === 'home'}
                    title={selectedTab === 'home' ? 'HOME' : null}
                    renderIcon={() => <Icon type='ionicon' containerStyle={styles.icon} color={'#5e6977'} name='ios-home' size={31} />}
                    renderSelectedIcon={() => <Icon type='ionicon' color={'#6296f9'} name='ios-home' size={30} />}
                    onPress={() => this.changeTab('home')}>
                    <Home />
                </Tab>
                <Tab
                    titleStyle={styles.title}
                    selectedTitleStyle={styles.selectedTitle}
                    selected={selectedTab === 'mySeries'}
                    title={selectedTab === 'mySeries' ? 'MY TV SHOWS' : null}
                    renderIcon={() => <Icon type="ionicon" containerStyle={styles.icon} color={'#5e6977'} name='ios-list' size={31} />}
                    renderSelectedIcon={() => <Icon type="ionicon" color={'#6296f9'} name='ios-list' size={30} />}
                    onPress={() => this.changeTab('mySeries')}>
                    <MySeries />
                </Tab>
                <Tab
                    titleStyle={styles.title}
                    selectedTitleStyle={styles.selectedTitle}
                    selected={selectedTab === 'topSeries'}
                    title={selectedTab === 'topSeries' ? 'TOP SERIES' : null}
                    renderIcon={() => <Icon type="ionicon" containerStyle={styles.icon} color={'#5e6977'} name='ios-star' size={31} />}
                    renderSelectedIcon={() => <Icon type="ionicon" color={'#6296f9'} name='ios-star' size={30} />}
                    onPress={() => this.changeTab('topSeries')}>
                    <TopSeries />
                </Tab>
                <Tab
                    titleStyle={styles.title}
                    selectedTitleStyle={styles.selectedTitle}
                    selected={selectedTab === 'search'}
                    title={selectedTab === 'search' ? 'SEARCH' : null}
                    renderIcon={() => <Icon type="ionicon" containerStyle={styles.icon} color={'#5e6977'} name='ios-search' size={31} />}
                    renderSelectedIcon={() => <Icon type="ionicon" color={'#6296f9'} name='ios-search' size={30} />}
                    onPress={() => this.changeTab('search')}>
                    <Search />
                </Tab>
                <Tab
                    selectedTitleStyle={styles.selectedTitle}
                    selected={selectedTab === 'settings'}
                    renderIcon={() => <Icon type="font-awesome" containerStyle={styles.icon} color={'#5e6977'} name='sign-in' size={30} />}
                    renderSelectedIcon={() => <Icon type="font-awesome" color={'#6296f9'} name='sign-in' size={30} />}
                    onPress={() => this.askLogOutConfirmation()}>
                </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = {
    title: {
        color: "#93bedf",
        fontSize: 10
    },
    selectedTitle: {
        marginTop: -1,
        marginBottom: 6
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 12
    }
}

export default Tabbar;