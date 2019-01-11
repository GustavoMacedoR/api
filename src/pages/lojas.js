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
class lojas extends Component {
  state = { pesquisa: '' }
  async componentDidMount () {
    const pedido = await AsyncStorage.getItem('pedido', false)
    const endereco = await AsyncStorage.getItem('endereco', false)
    const cliente = await AsyncStorage.getItem('cliente', false)

    if (pedido) {
      carregaPedido(JSON.parse(pedido))
    }

    if (endereco) {
      carregaEndereco(JSON.parse(endereco))
    }

    if (cliente) {
      carregaCliente(JSON.parse(cliente))
    }

    // console.log(pedido)
    // await AsyncStorage.removeItem('pedido')
    // await AsyncStorage.removeItem('endereco')
    atualizaLoja()

    // this.props.navigation.navigate('pedido')
  }
  selectLoja = loja => {
    this.props.navigation.navigate('stack', { loja: loja })
  }
  render () {
    const lojas = []
    Object.keys(this.props.store.loja).map(key => {
      const item = this.props.store.loja[key]
      item.peso = 0
      if (item._id == this.props.store.pedido.loja._id) {
        lojas.unshift(item)
        item.peso = 10
      } else {
        lojas.push(item)
      }

      if (this.state.pesquisa.length > 0)
      if (item.nome.toUpperCase().search(this.state.pesquisa.toUpperCase().trim())!= -1){
        item.peso=1
      }
      
    })
    if (this.state.pesquisa.length > 0)
    lojas.sort(function(b,a) {
      return a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0;
    })

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='ios-search' />
            <Input
              placeholder='Buscar Restaurante'
              value={this.state.pesquisa}
              onChangeText={e => {
                this.setState({ pesquisa: e })
              }}
            />
            <Icon name='home' />
          </Item>
          {this.state.pesquisa.length > 0 ? (
            <Button transparent onPress={() => this.setState({ pesquisa: '' })}>
              <Text>Cancelar</Text>
            </Button>
          ) : null}
        </Header>
        {/* <Header>
          <Left />
          <Body>
            <Title>Restaurantes</Title>
          </Body>
          <Right />
        </Header> */}
        <Content>
        <View style={styles.container}>
            <Text style={styles.titulo}>Restaurantes</Text>
            
          </View>
          <Separator/>
          <List>
            {lojas.map(item => (
              <ListItem onPress={() => this.selectLoja(item)} key={item._id}>
                <Body>
                  
                  <Text >{item.nome}</Text>
                  <Text note>{item.legenda}</Text>
                </Body>
                <Right>
                  {item._id == this.props.store.pedido.loja._id ? (
                    <Button
                      danger
                      rounded
                      onPress={() => {
                        this.props.navigation.navigate(
                          'stack',
                          { loja: loja },
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
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(lojas)
