import React, { Component } from 'react'
import { Image, TouchableOpacity, Alert } from 'react-native'
import {
  Container,
  Header,
  Content,
  Title,
  Body,
  Left,
  Right,
  ListItem,
  Text,
  Button,
  Icon,
  View,
  Separator,
  Grid,
  Col,
  Row
} from 'native-base'
import { styles, colors } from '../styles'
import { connect } from 'react-redux'
import { removeProduto, addBusca } from '../actions'
import { NavigationActions } from 'react-navigation'

class pedido extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.store.pedido)
  }
  voltarCardapio = () => {
    this.props.navigation.navigate('produtos', {
      loja: this.props.store.pedido.loja
    })
  }

  receberEmCasa = () => {
    if (this.props.store.endereco.length > 0) {
      this.props.navigation.navigate('enderecos')
    } else {
      this.props.navigation.navigate('endereco')
    }
  }

  buscarNoRestaurante = () => {
    addBusca()
    this.props.navigation.navigate('contato')
  }

  render () {
    var total = 0
    this.props.store.pedido.lista.map((item, index) => {
      total += parseFloat(item.produto_opc.valor)
    })
    total = total.toFixed(2)

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
            <Title>Meu Pedido</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>
              {this.props.store.pedido.loja.nome}
            </Text>
            <Text style={styles.subtitulo}>
              {this.props.store.pedido.loja.legenda}
            </Text>
          </View>
          <Separator />
          {this.props.store.pedido.lista.map((item, index) => {
            return (
              <ListItem noIndent key={index}>
                <View style={{ width: 60 }}>
                  <Button
                    danger
                    transparent
                    onPress={() => {
                      Alert.alert(
                        'Atenção',
                        'Tem certeza que deseja remover esse produto?',
                        [
                          {
                            text: 'Sim',
                            onPress: async () => {
                              const listaVazia = await removeProduto(index)
                              // console.log(aindaTem)
                              if (listaVazia) {
                                this.props.navigation.dismiss()
                              }
                            }
                          },
                          { text: 'Não', onPress: () => {} }
                        ],
                        { cancelable: false }
                      )
                    }}
                  >
                    <Icon name='remove-circle' />
                  </Button>
                </View>
                <View row>
                  <Text>
                    {item.produto_opc.quantidade} | {item.produto.nome} - R${' '}
                    {item.produto_opc.valor}
                  </Text>
                  {item.produto.atributos.map(atributo => (
                    <Text note key={atributo._id}>
                      {atributo.nome}:{' '}
                      {item.produto_opc.atributos[atributo._id].nome}
                      {item.produto_opc.atributos[atributo._id].valorf == 0
                        ? null
                        : ' - R$ ' +
                          item.produto_opc.atributos[atributo._id].valorf}{' '}
                    </Text>
                  ))}
                  {item.produto_opc.adicionais.length > 0 ? (
                    <Text note>Adicionais:</Text>
                  ) : null}
                  {item.produto_opc.adicionais.map(adicional => (
                    <Text note key={adicional._id}>
                      {adicional.quantidade} | {adicional.nome} - R${' '}
                      {adicional.valorf}
                    </Text>
                  ))}
                  {!item.produto_opc.observacoes ? null : (
                    <Text note>Obs: {item.produto_opc.observacoes}</Text>
                  )}
                </View>
              </ListItem>
            )
          })}
          <ListItem>
            <Body>
              <Text>Valor Total: R$ {total}</Text>
            </Body>
          </ListItem>
          <Separator />

          <Button info block large onPress={() => this.voltarCardapio()}>
            <Text>Adicionar mais produtos</Text>
          </Button>
          <View style={{ height: 10 }} />
          <Button info block success large onPress={() => this.receberEmCasa()}>
            <Text>Receber em casa</Text>
          </Button>
          <View style={{ height: 10 }} />
          <Button
            info
            block
            warning
            large
            onPress={() => this.buscarNoRestaurante()}
          >
            <Text>Buscar no Restaurante</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(pedido)
