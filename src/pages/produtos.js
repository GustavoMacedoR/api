import React, { Component } from "react";
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
import { styles } from "../styles";
import axios from "../axios";

export default class produtos extends Component {
  state = {
    categorias: []
  };

  async componentWillMount() {

    console.log("produtos",this.props)
    const { id } = this.props.navigation.state.params.loja;
    const res = await axios.get("loja/" + id);
    this.setState({
      categorias: res.data
    });

    // this.props.navigation.navigate("produto", { produto: this.state.categorias[0].produtos[0] });
  }
  

  goProduto = produto => {
    this.props.navigation.navigate("produto", { produto: produto });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.dismiss()}>
              <Icon
                name="arrow-back"
                
              />
            </Button>
          </Left>
          <Body>
            <Title>Cadápio</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {/* <Thumbnail
                square
                source={{
                  uri:
                    "https://cdn.pixabay.com/user/2015/01/20/20-56-42-330_250x250.jpg"
                }}
              /> */}
          <View style={styles.container}>
            <Text style={styles.titulo}>
              {this.props.navigation.state.params.loja.nome}
            </Text>
            <Text style={styles.subtitulo}>
              {this.props.navigation.state.params.loja.legenda}
            </Text>
          </View>
          <List>
            {this.state.categorias.map((categoria, categoria_index) => (
              <View key={categoria.id}>
                <Separator bordered>
                  <Text>{categoria.nome}</Text>
                </Separator>
                {categoria.produtos.map((produto, produto_index) => (
                  <ListItem
                    key={produto.id}
                    onPress={() => this.goProduto(produto)}
                  >
                    <Body>
                      <Text>{produto.nome}</Text>
                      <Text note>{produto.legenda}</Text>
                    </Body>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                ))}
              </View>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}
