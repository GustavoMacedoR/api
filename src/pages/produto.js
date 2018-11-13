import React, { Component } from "react";
import MkNumberPicker from "../components/mknumerpicker";
import NumericInput from "react-native-numeric-input";
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
  Thumbnail,
  Textarea
} from "native-base";
import { styles } from "../styles";
class produto extends Component {
  constructor(props) {
    super(props);

    const novo = {};
    props.navigation.state.params.produto.produtoatributos.map(
      item => (novo[item.id] = { id: null, nome: "" })
    );
    this.state = {
      atributos: novo,
      adicionais: [],
      quantidade: 1
    };
  }
  componentDidMount() {
    // this.gotoAdicionais(this.props.navigation.state.params.produto.grupoadicionals)
  }
  setAtributo = (atributo_id, valor) => {
    const novo = JSON.parse(JSON.stringify(this.state.atributos));
    novo[atributo_id] = valor;
    this.setState({
      atributos: novo
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
      atual: this.state.atributos[atributo.id].id,
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
    // const {produto} = this.props;
    const { produto } = this.props.navigation.state.params;

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
            <Text style={styles.titulo}>{produto.nome}</Text>
            <Text style={styles.subtitulo}>{produto.legenda}</Text>
          </View>
          {produto.produtoatributos.length == 0 ? null : (
            <List>
              <Separator bordered>
                <Text>Atributos</Text>
              </Separator>
              {produto.produtoatributos.map((item, index) => (
                <ListItem
                  onPress={() => this.gotoAtributos(item)}
                  key={item.id}
                >
                  <Body>
                    <Text>Escolha {item.nome}</Text>
                    <Text note>{this.state.atributos[item.id].nome}</Text>
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
              onPress={() => this.gotoAdicionais(produto.grupoadicionals)}
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
            />
          </View>

          {/* <View style={styles.produto}>
          <Text style={styles.nome}>Quantidade:</Text>
          <NumericInput
            initValue={1}
            minValue={1}
            maxValue={10}
            onChange={value => console.log(value)}
          />
        </View> */}
          {/* <View style={styles.produto}>
          <Text style={styles.nome}>react-servações:</Text>
          <TextInput
            style={{ borderColor: "gray", borderBottomWidth: 1 }}
            multiline={true}
            
            onChangeText={obs => this.setState({ obs })}
            value={this.state.text}
          />
        </View> */}
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
