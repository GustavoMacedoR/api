import React, {Component} from 'react';
import { Image,TouchableOpacity } from 'react-native';
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
  Accordion
} from "native-base";
import axios from "../axios";
import { styles } from "../styles";

var produtos = [];

class Quantidade extends Component{
  render(){
    return(
      <Content></Content>
    );
  }
}

export default class pedido extends Component {

   constructor(props) {
    super(props);

    this.state = {
      produtos:[]
    }
   }

   createDataArray(produtos){

   }

   setprodutos(){

      const { navigation } = this.props;
      const produto = navigation.getParam('pedido','padrao');
      if(produto != 'padrao'){
        produtos.push(produto);
      }
      this.setState({
        produtos: produtos
      })  
   }

   componentDidMount(){
    this.setprodutos();
   }

   voltarCardapio = () => {
    this.props.navigation.navigate("produtos", {qtdPd: produtos.length});
   }

    render() {
      return (
        <Container >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
          </Left>
          <Body>
            <Title>Pedidos</Title>
          </Body>
          <Right />
        </Header>
          <Content>
            {this.state.produtos.map((item, index) => (
              <ListItem key={item.id}>
                    <Body>
                      <Text>{item.nome}</Text>
                      
                      <Text note >Quantidade:{item.quantidade}</Text>

                      {console.error(item.atributos)}

                      <Text note >Atributos:</Text>
                      {Object.keys(item.atributos).map((object,index) => ( 
                        <Text style={{paddingLeft:10}} note >{item.atributos[object].nome}</Text>
                      ))}
                      
                      <Text note >Adicionais:</Text> 
                      {item.adicionais.map((adicionais,index) =>( 
                        <Text style={{paddingLeft:10}} note >{adicionais.quantidade} - {adicionais.nome}</Text>
                      ))}

                      <Text note >Observações:</Text>
                        <Text style={{paddingLeft:10}} note >{item.observacoes}</Text>
                    </Body>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
            ))}
          </Content>
          <View style={styles.container}>
            <Button iconLeft block onPress={() => this.voltarCardapio()}>
              <Icon name="ios-list" />
              <Text>Voltar ao Menu</Text>
            </Button>
          </View>
        </Container>
      );
    }
  }