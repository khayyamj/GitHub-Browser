'use strict'

import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor (props) {
    super (props)
    this.state = {
    }
  }

  render () {

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => this.setState({searchQuery: text})}
          style={styles.searchInput}
          placeholder='Search Query' />
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  onSearchPressed () {
    console.log('Attempting to search for ' + this.state.searchQuery)
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    })
  }

} // end class component

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  searchInput: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
    alignSelf: 'center'
  }
})

export default Search
