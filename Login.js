'use strict'

import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native'
import buffer from 'buffer'

class Login extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showProgress: false
    }
  }

  render () {
    let errorCtrl = <View />

    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>
    }
    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./images/Octocat.png')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({username: text})}
          style={styles.loginInput}
          placeholder='Github Username' />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.loginInput}
          placeholder='Github Password'
          secureTextEntry={true} />
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader} />
      </View>
    )
  }

  onLoginPressed () {
    console.log('Attempting to log in with username ' + this.state.username)
    this.setState({ showProgress: true })

    let authService = require('./AuthService')
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results))

      if (results.success && this.props.onLogin) {
        this.props.onLogin()
      }
    })
  }
} // end class component

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
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
  loginInput: {
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
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red'
  }
})

export default Login
