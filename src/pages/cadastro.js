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
        Thumbnail } from 'native-base';
import {AsyncStorage} from 'react-native';
import axios from "../axios";

export default class cadastro extends Component {
  
  state = {
    nome: "", //apenas no register
    celular: "",
    password: "123"
  }

  cadastraUsuario = () =>{

     console.log(this.state);

    axios.post('https://node.calangoo.com/cliente/register', 
      this.state
    )
    .then(function (response) {
      console.log(response.data);
      AsyncStorage.setItem('test', JSON.stringify(response.data));
      AsyncStorage.getItem('test', (err, result) => {
        console.log(result);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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
          <Thumbnail source={require('../images/calangoo.png')} style={{height: 200, width: 384}}/>
          <Form>
            <Item floatingLabel >
              <Label>Nome de Usuário</Label>
              <Input onChangeText={(text) => this.setState({nome:text})} />
            </Item>
            <Item floatingLabel >
              <Label>Número de Celular</Label>
              <Input keyboardType={'numeric'} onChangeText={(text) => this.setState({celular:text})} />
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