import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AuthService from './AuthService'
import Login from './Login'
import AppContainer from './AppContainer'

export default class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }

  componentDidMount () {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  }

  onLogin () {
    this.setState({ isLoggedIn: true })
    console.log('Successful Login!')
  }

  render () {
    console.log('Logged in: ' + this.state.isLoggedIn, 'Checking Auth: ' + this.state.checkingAuth)
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size='large'
            style={styles.loader}
          />
        </View>
      )
    }

    if(this.state.isLoggedIn) {
      return (
        <AppContainer />
      )
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)} />
      )
    }
  }
}

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
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
