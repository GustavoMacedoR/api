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


export default class App extends Component {
  state = {
    lojas: []
  };
  async componentDidMount() {
    const res = await axios.get("loja");
    this.setState({
      lojas: res.data
    });

  }
    selectLoja = (loja) => {
      this.props.navigation.navigate('stack',{loja:loja})
    }
    render() {
      return (
        <Container >
        <Header>
          <Left/>
          <Body>
            <Title>Restaurantes</Title>
          </Body>
          <Right />
        </Header>
          <Content>
            {/* <Lojas onSelect={this.selectLoja} /> */}

            <List >
        {this.state.lojas.map((item, index) => (
          <ListItem thumbnail onPress={() => this.selectLoja(item)} key={item.id}>
            <Left>
              <Thumbnail
                square
                source={{
                  uri:
                    "https://cdn.pixabay.com/user/2015/01/20/20-56-42-330_250x250.jpg"
                }}
              /> 
            </Left>
            <Body>
              <Text>{item.nome}</Text>
              <Text note>{item.legenda}</Text>
            </Body>
            <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
        ))}
      </List>

          </Content>
        </Container>
      );
    }
  }

