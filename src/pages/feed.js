import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Title,
  Body,
  Left,
  Right,
  List,
  ListItem,
  Text,
  Separator,
  Button,
  Icon,
  View,
  Thumbnail,
  Item,
  Input
} from 'native-base'
import { atualizaLoja, carregaPedido,carregaEndereco,carregaCliente } from '../actions'
import { connect } from 'react-redux'
import { YellowBox } from 'react-native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { styles, colors } from '../styles'
YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true
class feed extends Component {
  render () {

    return (
      <Container>
        <Header><Left/>
          <Body>
            <Title>CalanGoo</Title>
          </Body>
          <Right /></Header>
        <Content>
        <View style={styles.container}>
            <Text style={styles.titulo}>Feed</Text>
          </View>
          <Separator/>
          <List>
            {this.props.store.feed.map(item => (
              <ListItem >
                <Body>
                  
                  <Text >pedido</Text>
                  {/* <Text note>{item.legenda}</Text> */}
                </Body>
                <Right> 
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(feed)
