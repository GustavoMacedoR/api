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
import { connect } from 'react-redux'
import { YellowBox } from 'react-native'
import { AsyncStorage } from 'react-native'
import { styles, colors, fonts } from '../styles'
import { attMeusPedidos } from '../actions'
import { informacoespedido } from '.';
import pedido from './pedido';
YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true
class info extends Component {

  constructor(props) {

    super(props);

    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {

      //this._retrieveData()
      this.atualizar()
    });
  }

  state = {
    pedido: {}
  }

  atualizar = async () => {
    var pedido = await this.props.navigation.getParam('item', 'NO-Item');
    await this.setState({ pedido: pedido })
  }

  maketext = (texto, iterator, inicial) => {
    var textoformat = ""
    var inicial = inicial
    var i = iterator
    while (i < texto.length) {
      if (texto[i] == "|") {
        textoformat = texto.slice(inicial, i)
        inicial = i
        return (
          <View style={{ marginTop: 5 }} key={i}>
            {textoformat[0] == "|" && <Text style={{ marginLeft: 10 }}>{textoformat}</Text>}
            {textoformat[0] != "|" && <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{textoformat}</Text>}
            {this.maketext(texto, i + 1, inicial)}
          </View>
        )
      } else {
        i++
      }
    }
  }

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dismiss()
              }}
            >
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Informações</Title>
          </Body>
          <Right /></Header>
        <Content>
          {/* <Separator><Text>Detalhes do pedido</Text></Separator> */}
          <List>
            <ListItem>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Envio do pedido: </Text>
                  <Text>{this.state.pedido.enviado}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Status: </Text>
                  <Text>{this.state.pedido.status}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Observação: </Text>
                  <Text>{this.state.pedido.observacao}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Endereço: </Text>
                  <Text style={{ fontSize: fonts.regular, marginEnd: 80 }}>{this.state.pedido.endereco}</Text>
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Itens: </Text>
                {this.state.pedido.item_pedido != undefined && this.state.pedido.item_pedido.map((item, index) => {
                  return (
                    <View key={index}>
                      {this.maketext(item.nome, 0, 0)}
                      <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Observações: </Text>
                        <Text>{item.observacao}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Text note style={{ fontWeight: 'bold', fontSize: fonts.big }}>Valor Item: </Text>
                        <Text>{item.valor}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </ListItem>
            <ListItem>
              <View style={{ flexDirection: 'row' }}>
                <Text note style={{ fontWeight: 'bold', fontSize: fonts.bigger }}>Total: </Text>
                <Text style={{ fontSize: fonts.bigger, marginEnd: 80 }}>{this.state.pedido.valor}</Text>
              </View>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(info)
