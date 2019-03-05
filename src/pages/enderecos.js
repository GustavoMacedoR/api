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
import { addEndereco } from '../actions'
import { styles, colors, fonts } from '../styles'
import axios from "../axios";
import { enderecos } from '.';

export default class cadastro extends Component {

  state = {
   cep:"", endereco:"", numero:"", complemento:"", bairro:"", cidade:"", uf:""
  }

  cadastraEndereco = async () => {
    const token = await this.props.navigation.getParam("token")

    if(this.state.cep != "" && 
        this.state.endereco != "" && 
        this.state.numero != "" && 
        this.state.complemento != "" && 
        this.state.bairro != "" && 
        this.state.cidade != "" &&
        this.state.uf != ""
        ){
      try {
        let Body = this.state
        console.log(token)
        const res = await axios.post('/endereco', Body)
        console.log("endereço",res.data)
        await addEndereco(res.data)
        this.props.navigation.navigate('pedidos')
       
      } catch (error) {
        alert('Erro')
        console.log(error.response.data)
      }
    }else{
        alert("Por favor preencha todos os campos!")
    }
  }

  componentWillMount = async () => {
    const cliente = this.props.navigation.getParam("cliente")
    console.log(cliente)
  }

  render() {

    console.log(this.state);
    const cliente = this.props.navigation.getParam("cliente")

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
            <Text style={styles.titulo}>Muito Bem Vindo</Text>
            {cliente != undefined && <Text style={styles.titulo}>{cliente.nome}</Text>}
            <Text style={styles.subtituloSimple}>
              Para finalizar só precisamos do seu endereço!
            </Text>
          </View>
          <Form>
            <Item floatingLabel >
              <Label>Cep</Label>
              <Input keyboardType="numeric" onChangeText={(text) => this.setState({cep:text })} />
            </Item>
            <Item floatingLabel >
              <Label>Endereço</Label>
              <Input onChangeText={(text) => this.setState({endereco:text})} />
            </Item>
            <Item floatingLabel >
              <Label>Número</Label>
              <Input keyboardType="numeric" onChangeText={(text) => this.setState({numero: text })} />
            </Item>
            <Item floatingLabel >
              <Label>Complemento</Label>
              <Input onChangeText={(text) => this.setState({complemento: text })} />
            </Item>
            <Item floatingLabel >
              <Label>Bairro</Label>
              <Input onChangeText={(text) => this.setState({bairro: text })} />
            </Item>
            <Item floatingLabel >
              <Label>Cidade</Label>
              <Input onChangeText={(text) => this.setState({cidade: text })} />
            </Item>
            <Item floatingLabel >
              <Label>UF</Label>
              <Input onChangeText={(text) => this.setState({uf: text })} />
            </Item>
          </Form>
        </Content>

        <Button iconLeft block success onPress={() => this.cadastraEndereco()}>
          <Icon name="ios-checkmark" />
          <Text>Confirmar Cadastro</Text>
        </Button>
      </Container>
    );
  }
}