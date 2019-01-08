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
import { removeProduto } from '../actions'
import { NavigationActions } from 'react-navigation';
var produtos = []
var Pedido = {
  clientName: 'username',
  endereco: 'avenida são joão rua 25 numero 10',
  idPedido: 0,
  observacoes: 'sem observacoes',
  tipoPagamento: 'Cartão de Crédito',
  produtos: []
}

class pedido extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.store.pedido)
  }
  voltarCardapio = () => {
    // console.log(this.props.navigation)
    // this.props.navigation.popToTop()
    this.props.navigation.navigate('produtos',{ loja: this.props.store.pedido.loja })

  }

  enviaPedido = () => {
    // Pedido.idPedido = Math.floor((Math.random() * 99999999) + 10000000);
    // Pedido.produtos = produtos;
    // console.log(produtos);
    // this.props.navigation.navigate("cadastro", {pedido:pedido});
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
                             if( listaVazia){
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
          <Grid>
            <Col>
              <TouchableOpacity
                onPress={() => this.voltarCardapio()}
                style={{
                  backgroundColor: colors.info,
                  height: 100,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: colors.white ,fontSize:24,textAlign:'center'}}>
                  Adicionar mais produtos
                </Text>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                onPress={() => this.enviaPedido()}
                style={{
                  backgroundColor: colors.success,
                  height: 100,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: colors.white,fontSize:24,textAlign:'center' }}>Concluir Pedido</Text>
              </TouchableOpacity>
            </Col>
          </Grid>

          <Separator />
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(pedido)
