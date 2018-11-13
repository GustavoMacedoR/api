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
  Thumbnail,
  Badge
} from "native-base";
import MkNumberPicker from "../components/mknumerpicker";
import { styles, colors } from "../styles";
class adicionais extends Component {
  constructor(props) {
    super(props);

    const novo = {};
    props.navigation.state.params.opcoes.map(grupo =>
      grupo.adicionals.map(
        adicional =>
          (novo[adicional.id] = {
            id: adicional.id,
            quantidade: 0,
            nome: adicional.nome
          })
      )
    );

    props.navigation.state.params.atual.map(
      item => (novo[item.id].quantidade = item.quantidade)
    );

    this.state = {
      adicionais: novo
    };
  }

  setQuantidade = (id, qtd) => {
    const novo = JSON.parse(JSON.stringify(this.state.adicionais));
    novo[id].quantidade = qtd;
    this.setState({ adicionais: novo });
  };

  componentDidMount() {}
  render() {
    const { onConfirm, opcoes } = this.props.navigation.state.params;
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Selecione</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>Adicionais</Text>
          </View>
          <List>
            {opcoes.map(grupo => (
              <View key={grupo.id}>
                <Separator bordered>
                  <Text>{grupo.nome}</Text>
                </Separator>
                {grupo.adicionals.map(adicional => (
                  <MkNumberPicker
                    key={adicionais.id}
                    onChange={e => {
                      this.setQuantidade(adicional.id, e);
                    }}
                    titulo={adicional.nome}
                    subtitulo={adicional.valor}
                    inicial="0"
                    min="0"
                    max="10"
                  />
                ))}
              </View>
            ))}
          </List>
          <View style={styles.container}>
            <Button
              iconLeft
              block
              onPress={() => {
                onConfirm(this.state.adicionais);
                navigation.goBack();
              }}
            >
              <Icon name="ios-checkmark" />
              <Text>Confirmar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
export default adicionais;
