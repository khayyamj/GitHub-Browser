'use strict'

import React, { Component } from 'react'
import { Text, View, StyleSheet, TabBarIOS } from 'react-native'

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
          <Text style={styles.welcome}>Tab 1</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Search'
          selected={this.state.selectedTab === 'search'}
          icon={require('./images/search.png')}
          onPress={() => this.setState({ selectedTab: 'search' })}
        >
          <Text style={styles.welcome}>Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

} // end of AppContainer class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
  }
});

export default AppContainer
