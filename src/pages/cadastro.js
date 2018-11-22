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

export default class cadastro extends Component {
  
  render() {
    
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
              <Input />
            </Item>
            <Item floatingLabel >
              <Label>Número de Celular</Label>
              <Input keyboardType={'numeric'} />
            </Item>
            <Item floatingLabel >
              <Label>Endereço</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        
        <Button iconLeft block success >
              <Icon name="ios-checkmark" />
              <Text>Confirmar Cadastro</Text>
        </Button>
      </Container>
    );
  }
}