'use strict'

import React, { Component } from 'react'
import { Text, View, Image, ListView, ActivityIndicator } from 'react-native'
import moment from 'moment'

class Feed extends Component {
  constructor (props) {
    super (props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds.cloneWithRows(['A', 'B', 'C', 'D']),
      showProgress: true
    }
  }

  componentDidMount () {
    this.fetchFeed()
  }

  fetchFeed () {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      const url = `https://api.github.com/users/${authInfo.user.login}/received_events`
      fetch (url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        const feedItems = responseData.filter ((ev) => ev.type === 'PushEvent')
        console.log('responseData: ', responseData, 'feedItems: ', feedItems)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        })
      })
    })
  }

  renderRow (rowData) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
      }}>
        <Image
          source={{uri: rowData.actor.avatar_url}}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18
          }}
        />
        <View style={{
          paddingLeft: 20
        }}>
          <Text style={{backgroundColor: '#FFF'}}>
            {moment(rowData.created_at).fromNow()}
          </Text>
          <Text style={{backgroundColor: '#FFF'}}>
            <Text style={{
              fontWeight: '600'
            }}>{rowData.actor.login}</Text> pushed to
          </Text>
          <Text style={{backgroundColor: '#FFF'}}>
            {rowData.payload.ref.replace('refs/heads/')}
          </Text>
          <Text style={{backgroundColor: '#FFF'}}>
            at <Text style={{
              fontWeight: '600'
            }}>{rowData.repo.name}</Text>
          </Text>
        </View>
      </View>
    )
  }

  render () {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size='large'
            animating={true}
          />
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }

} // end of Feed class

export default Feed
