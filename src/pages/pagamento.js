import React, { Component } from 'react'
import MkNumberPicker from '../components/mknumerpicker'
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
  Textarea,
  Item,
  Label,
  Input,
  Form
} from 'native-base'
import { styles, colors } from '../styles'
import { addObservacao, addTipoPagamento,clearPedido } from '../actions'
import {  NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Separador from '../components/separador'
import axios from '../axios'
class pagamento extends Component {

  setTipoPagamento = item => {
    addTipoPagamento(item)
  }

  concluirPedido = async () =>{
    try{
      const res = await axios.post('pedido',this.props.store.pedido)

      this.props.navigation.navigate("lojas")

      // this.props.navigation.reset(
      //   [NavigationActions.navigate({ routeName: 'lojas' })],
      //   0
      // )

      // const resetAction = StackActions.reset({
      //   index: 1,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'Profile' }),
      //     NavigationActions.navigate({ routeName: 'Settings' }),
      //   ],
      // });
      // this.props.navigation.dispatch(resetAction);
      clearPedido()
    }catch(e){
      console.log(JSON.stringify(e))
      alert(e)
    }
  }

  render () {
    var valor = 0
    this.props.store.pedido.lista.map((item, index) => {
        valor += parseFloat(item.produto_opc.valor)
    })
    var total = valor
    valor = valor.toFixed(2)

    var valorentrega = 0  
    if (this.props.store.pedido.mododeentrega == 'RECEBER'){
        valorentrega = parseFloat(this.props.store.pedido.loja.valorentrega)  
        if (!valorentrega )
        valorentrega =0
    }
    total += valorentrega

    valorentrega = valorentrega.toFixed(2)
    total = total.toFixed(2)

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Pagamento</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Pagamento</Text>
            <Text style={styles.subtitulo} />
          </View>
          <Separator />
          <ListItem>
              <Body>
                  <Text>Valor:   R$ {valor}</Text>
                  <Text>Entrega: R$ {valorentrega}</Text>
                  <Text>Total:   R$ {total}</Text>
              </Body>
          </ListItem>
          <Separador/>
          <ListItem onPress={()=>{
              this.props.navigation.navigate('tipopagamento', {
                lista: ['DINHEIRO','CARTAO CREDITO','CARTAO DEBITO'],
                atual: this.props.store.pedido.tipopagamento,
                onSelect: this.setTipoPagamento
                })
          }}>
            <Body>
              <Text>Forma de Pagamento</Text>
              {!this.props.store.pedido.tipopagamento ? (
                <Text style={{ color: colors.danger }}>Selecione</Text>
              ) : (
                <Text note>{this.props.store.pedido.tipopagamento}</Text>
              )}
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </ListItem>
          <Separador/>
          <Form>
          <Item stackedLabel>
            <Label>Observações / Troco</Label>
            <Input
            multiline = {true}
            numberOfLines = {4}
              value={this.props.store.pedido.observacao}
              onChangeText={e => {
                addObservacao(e)
              }}
            />
          </Item>
          </Form>
          <Separador/>
          <Button info block success large onPress={() => this.concluirPedido()}>
            <Text>Concluir Pedido</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
export default connect(store => ({ store }))(pagamento)
