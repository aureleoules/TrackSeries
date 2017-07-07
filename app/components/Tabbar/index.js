import React from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {View} from 'react-native';

import { Tabs, Tab } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../../fragments/Home';
import MySeries from '../../fragments/MySeries';
import TopSeries from '../../fragments/TopSeries';
import Settings from '../../fragments/Settings';

class Tabbar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'home',
        }
    }
    changeTab = selectedTab => this.setState({selectedTab});

    render() {
        const {selectedTab} = this.state;
        const tabBarHeight = 50;

        return (
            <Tabs sceneStyle={{paddingTop: 70, marginLeft: 5, marginRight: 5, marginBottom: 5}}>
            <Tab
                titleStyle={{fontWeight: 'bold', fontSize: 10}}
                selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
                selected={selectedTab === 'home'}
                title={selectedTab === 'home' ? 'HOME' : null}
                renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='home' size={33} />}
                renderSelectedIcon={() => <Icon color={'#6296f9'} name='home' size={30} />}
                onPress={() => this.changeTab('home')}>
                <Home />
            </Tab>
            <Tab
                titleStyle={{fontWeight: 'bold', fontSize: 10}}
                selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
                selected={selectedTab === 'mySeries'}
                title={selectedTab === 'mySeries' ? 'MY SERIES' : null}
                renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='view-list' size={33} />}
                renderSelectedIcon={() => <Icon color={'#6296f9'} name='view-list' size={30} />}
                onPress={() => this.changeTab('mySeries')}>
                <MySeries />
            </Tab>
            <Tab
                titleStyle={{fontWeight: 'bold', fontSize: 10}}
                selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
                selected={selectedTab === 'topSeries'}
                title={selectedTab === 'topSeries' ? 'TOP SERIES' : null}
                renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='star' size={33} />}
                renderSelectedIcon={() => <Icon color={'#6296f9'} name='star' size={30} />}
                onPress={() => this.changeTab('topSeries')}>
                <TopSeries />
            </Tab>
            <Tab
                titleStyle={{fontWeight: 'bold', fontSize: 10}}
                selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
                selected={selectedTab === 'settings'}
                title={selectedTab === 'settings' ? 'SETTINGS' : null}
                renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='settings' size={33} />}
                renderSelectedIcon={() => <Icon color={'#6296f9'} name='settings' size={30} />}
                onPress={() => this.changeTab('settings')}>
                <Settings />
            </Tab>
            </Tabs>
        );
    }
}

export default Tabbar;