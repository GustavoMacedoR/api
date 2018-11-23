import React, { Component } from "react";
import MkNumberPicker from "../components/mknumerpicker";
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
  Textarea
} from "native-base";
import { styles } from "../styles";

class produto extends Component {
  constructor(props) {
    super(props);

    const novo = {};
    props.navigation.state.params.produto.atributos.map(
      item => (novo[item._id] = { id: item._id, nome:""})
    );

    this.state = {
      nome: "lanche",
      atributos: novo,
      adicionais: [],
      observacoes:"",
      quantidade: 1,
      };
  }
  
  setAtributo = (atributo_id, valor) => {
    const novo = this.state.atributos;
    novo[atributo_id] = valor;
    atributos = novo;
    this.setState({
      atributos: atributos
    });
  };
 

  clicou = () => {
    this.props.navigation.navigate("pedido", { pedido: this.state });
  };

  setAdicionais = valor => {
    //console.log("adc", valor);
    // const old = JSON.parse(JSON.stringify(valor))
    let novo = [];
    Object.keys(valor).forEach(id => {
      //console.log(id + " = " + valor[id]);
      //console.log(valor[id]);
      if (valor[id].quantidade > 0) novo = [...novo, valor[id]];
    });
    //console.log("novo", novo);
    this.setState({
      adicionais: novo
    });
    //console.log("state", this.state.adicionais);
  };

  gotoAtributos = atributo => {
    this.props.navigation.navigate("atributos", {
      atributo: atributo,
      atual: this.state.atributos[atributo._id].id,
      onSelect: this.setAtributo
    });
  };
  gotoAdicionais = opcoes => {
    this.props.navigation.navigate("adicionais", {
      opcoes: opcoes,
      atual: this.state.adicionais,
      onConfirm: this.setAdicionais
    });
  };

   render() {
    const produto = this.props.navigation.state.params.produto;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Produto</Title>
          </Body>
          <Right />
        </Header>
         <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>{this.state.nome = produto.nome}</Text>
            <Text style={styles.subtitulo}>{produto.legenda}</Text>
          </View>
          {produto.atributos.length == 0 ? null : (
            <List>
              <Separator bordered>
                <Text>Atributos</Text>
              </Separator>
              {produto.atributos.map((item, index) => (

                <ListItem
                  onPress={() => this.gotoAtributos(item)}
                  key={item._id}
                >
                  <Body>
                    <Text>Escolha {item.nome}</Text>
                    <Text note>{this.state.atributos[item._id].nome}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))}
            </List>
          )}
          <List>
            <Separator bordered>
              <Text>Adicionais</Text>
            </Separator>
            <ListItem
              onPress={() => this.gotoAdicionais(produto.adicionais)}
            >
              <Body>
                <Text>Escolha os adicionais (opcional)</Text>
                {this.state.adicionais.map(adicional => (
                  <Text note key={adicional.id}>
                    {" "}
                    {adicional.quantidade} - {adicional.nome}
                  </Text>
                ))}
              </Body>
              <Right>
                <Icon name="add" />
              </Right>
            </ListItem>
            <Separator bordered />
          </List>
          <List>
            <MkNumberPicker
              onChange={e => {
                this.setState({ quantidade: e });
              }}
              titulo="Quantidade"
              inicial="1"
              min="1"
              max="20"
            />
          </List>
          <Separator bordered>
            <Text>Observações no produto</Text>
          </Separator>

          <View style={styles.container}>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Algum detalhe que precisamos saber?"
              onChangeText={(text) => this.setState({observacoes:text})}
            />
          </View>
          <View style={styles.container}>
            <Button iconLeft block onPress={() => this.clicou()}>
              <Icon name="ios-cart" />
              <Text>Adicionar</Text>
            </Button>
          </View>
        </Content>
       
      </Container>
    );
  }
}

export default produto;
