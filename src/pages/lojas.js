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
  Thumbnail
} from 'native-base'
import { atualizaLoja, carregaPedido } from '../actions'
import { connect } from 'react-redux'
import { YellowBox } from 'react-native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true
class lojas extends Component {
  async componentDidMount () {
    const pedido = await AsyncStorage.getItem('pedido', false)

    if (pedido) {
      carregaPedido(JSON.parse(pedido))
    } else {
      await AsyncStorage.removeItem('pedido')
    }
    // console.log(pedido)
    // await AsyncStorage.removeItem('pedido')
    atualizaLoja()

    // this.props.navigation.navigate('pedido')
  }
  selectLoja = loja => {
    this.props.navigation.navigate('stack', { loja: loja })
  }
  render () {
    // if (Object.keys(this.props.store.loja)[0])
    // this.props.navigation.navigate('stack', { loja: this.props.store.loja[Object.keys(this.props.store.loja)[1]] })

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Restaurantes</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {Object.keys(this.props.store.loja).map(key => {
              const item = this.props.store.loja[key]
              return (
                <ListItem onPress={() => this.selectLoja(item)} key={item._id}>
                  <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{item.legenda}</Text>
                  </Body>
                  <Right>
                    {item._id == this.props.store.pedido.loja._id ? (
                      <Button
                        danger
                        onPress={() => {
                          this.props.navigation.navigate('stack',{ loja: loja },
                            NavigationActions.navigate({ routeName: 'pedido' })
                          )
                         
                        }}
                      >
                        <Icon name='ios-cart' />
                      </Button>
                    ) : (
                      <Icon name='arrow-forward' />
                    )}
                  </Right>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(lojas)
