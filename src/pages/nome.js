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
import { addProduto,setCliente } from '../actions'
import { connect } from 'react-redux'
import axios from '../axios'
class nome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nome: props.store.cliente.nome,
      sobrenome: props.store.cliente.sobrenome
    }
  }

  cadastrar = async () => {
    if (this.state.nome < 3 || this.state.sobrenome < 3) {
      alert('Digite o nome e sobrenome!')
    } else {
      try {
        const res = await axios.post('cliente/setnome', {
          ...this.state,
          telefone: this.props.store.cliente.telefone,
          codigo: this.props.store.cliente.codigo
        })
        await setCliente(res.data)
        this.props.navigation.dismiss()
      } catch (error) {
        console.log(JSON.stringify(error))
        alert('Ocorreu algum erro ao salvar')
      }
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() =>  this.props.navigation.dismiss()}>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Nome</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.cadastrar()}
            >
              <Text>Ok</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Separator/>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input
                value={this.state.nome}
                placeholder="Seu Nome"
                onChangeText={e => {
                  this.setState({ nome: e })
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Sobrenome</Label>
              <Input
              placeholder="Seu Sobrenome"
                value={this.state.sobrenome}
                onChangeText={e => {
                  this.setState({ sobrenome: e })
                }}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(nome)
