'use strict'

import React, { Component } from 'react'
import { Text, View, StyleSheet, TabBarIOS, NavigatorIOS } from 'react-native'
import Feed from './Feed'
import Search from './Search'

class AppContainer extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedTab: 'feed'
    }
  }

  render () {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title='Feed'
          selected={this.state.selectedTab === 'feed'}
          icon={require('./images/inbox.png')}
          onPress={() => this.setState({ selectedTab: 'feed' })}
        >
          <NavigatorIOS
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          >
          </NavigatorIOS>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Search'
          selected={this.state.selectedTab === 'search'}
          icon={require('./images/search.png')}
          onPress={() => this.setState({ selectedTab: 'search' })}
        >
          <NavigatorIOS
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
          >
          </NavigatorIOS>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

} // end of AppContainer class

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // }
});

export default AppContainer
