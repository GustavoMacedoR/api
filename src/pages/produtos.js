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
} from "native-base";
import { styles } from "../styles";
import axios from "../axios";
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

export default class produtos extends Component {

    state = {
      categorias:[]
    };

  async componentDidMount() {

    const id = this.props.navigation.state.params.loja._id;
    const res = await axios.get("loja/produtos/" + id);

    this.setState({
      categorias: res.data.produtos
    });
    // this.props.navigation.navigate("produto", { produto: this.state.categorias[0].produtos[0] });
  }
  

  goProduto = produto => {
    this.props.navigation.navigate("produto", { produto: produto });
  };
  
  goPedidosBackArrow = qtdPd => {
    if(qtdPd > 0){
      this.props.navigation.navigate("pedido");
    }else{
      this.props.navigation.dismiss();
    }
  }

  render() {

    const { navigation } = this.props;
    const produtosQuantidade = navigation.getParam('qtdPd', 0);

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goPedidosBackArrow(produtosQuantidade)}>
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
              <View key={categoria._id}>
                <Separator bordered>
                  <Text>{categoria.nome}</Text>
                </Separator>
                {categoria.produtos.map((produto, produto_index) => (
                  <ListItem
                    key={produto._id}
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
