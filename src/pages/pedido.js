import React, {Component} from 'react';
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
  Thumbnail
} from "native-base";
import axios from "../axios";


export default class pedido extends Component {

    render() { 
      return (
        <Container >
        <Header>
          <Left/>
          <Body>
            <Title>Pedidos</Title>
          </Body>
          <Right />
        </Header>
          <Content>
            {/* <Lojas onSelect={this.selectLoja} /> */}

          </Content>
        </Container>
      );
    }
  }