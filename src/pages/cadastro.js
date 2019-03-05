import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  Text,
  Thumbnail,
  View
} from 'native-base';
import { AsyncStorage } from 'react-native';
import { carregaCliente, setCliente } from '../actions'
import { styles, colors, fonts } from '../styles'
import axios from "../axios";

export default class cadastro extends Component {

  state = {
    telefone: ""
  }

  cadastraUsuario = async () => {

    if (this.state.nome != "") {
      try {
        let Body = { id: this.state.id, nome: this.state.nome }
        const res = await axios.post('/setnome', Body)
        console.log(res.data)
        await setCliente(res.data)
        if (res.data.enderecos.length >= 1) {
          this.props.navigation.navigate('pedidos')
        } else {
          this.props.navigation.navigate('enderecos')
        }

      } catch (error) {
        alert('Erro')
        console.log(error)
      }
    } else {
      alert("Por favor adicione o seu nome")
    }
  }

  masktext = text => {
    var normal = text
    var part1 = normal.substr(0, 2)
    var part2 = normal.substr(2, 6)
    var part3 = normal.substr(7, 11)

    return "(" + part1 + ") " + part2 + " - " + part3
  }

  componentWillMount = async () => {
    let valor = await AsyncStorage.getItem('cliente')
    this.setState(JSON.parse(valor))
  }

  render() {

    console.log(this.state);

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Cadastro</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Thumbnail source={require('../images/calangoo.png')} style={{ height: 200, width: 384 }} />
          <View style={styles.container}>
            <Text style={styles.titulo}>Esse é seu número</Text>
            {this.state != undefined && <Text style={styles.titulo}>{this.masktext(this.state.telefone)}</Text>}
            <Text style={styles.subtituloSimple}>
              Agora precisamos do seu nome completo!
            </Text>
          </View>
          <Form>
            <Item floatingLabel >
              <Label>Nome de Usuário</Label>
              <Input onChangeText={(text) => this.setState({ nome: text })} />
              {this.state != undefined &&  <Input value={this.state.nome} onChangeText={(text) => this.setState({ nome: text })} />}
            </Item>
          </Form>
        </Content>

        <Button iconLeft block success onPress={() => this.cadastraUsuario()}>
          <Icon name="ios-checkmark" />
          <Text>Confirmar Cadastro</Text>
        </Button>
      </Container>
    );
  }
}