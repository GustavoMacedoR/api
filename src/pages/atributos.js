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
class atributos extends Component {
  
  render() {
    const {onSelect,atual,atributo,atributo:{id,grupoatributos}} = this.props.navigation.state.params;
    const { navigation } = this.props;
    
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
              />
            </Button>
          </Left>
          <Body>
            <Title>Selecione</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>{atributo.nome}</Text>
          </View>
          <List>
            { 
              grupoatributos.map(grupo => (
              <View key={grupo.id}>
                <Separator bordered>
                  <Text>{grupo.nome}</Text>
                </Separator>
                {grupo.atributos.map(atributo => (
                  <ListItem icon key={atributo.id}
                    onPress=
                    {() => {
                      onSelect(id, atributo);
                      navigation.goBack();
                    }}
                    >
                    <Left>
                      <Button transparent light={atributo.id!=atual}>
                      <Icon name="ios-checkmark-circle" />
                      </Button>
                    </Left>
                    <Body>
                    <Text>{atributo.nome}</Text>
                    </Body>
                    
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
export default atributos;
