import React, { Component } from 'react'
import { View } from 'native-base'
import {colors} from '../styles'
export default class separador extends Component {
  render () {
    return <View style={{ height: 10,backgroundColor:colors.lighter }} />
  }
}
