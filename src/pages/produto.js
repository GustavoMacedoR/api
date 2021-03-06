import React, { Component } from 'react'
import MkNumberPicker from '../components/mknumerpicker'
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
} from 'native-base'
import { styles, colors } from '../styles'
import { addProduto } from '../actions'
import { connect } from 'react-redux'
class produto extends Component {
  constructor (props) {
    super(props)
    const novo = {}
    props.navigation.state.params.produto.produto_atributos.map(
      item => (novo[item.id] = { id: item.id, nome: '' })
    )

    this.state = {
      atributos: novo,
      adicionais: [],
      observacoes: '',
      quantidade: 1,
      valor: 0
    }
  }
  componentDidMount () {
    this.calculaTotal()
  }
  calculaTotal () {
    const produto = this.props.navigation.state.params.produto
    var valor = parseFloat(produto.valor)
    produto.produto_atributos.map(atributo => {
      if (this.state.atributos[atributo.id].valorf) { valor += parseFloat(this.state.atributos[atributo.id].valorf) }
    })
    this.state.adicionais.map(adicional => {
      valor += parseFloat(adicional.valorf)
    })

    valor *= this.state.quantidade
    valor = valor.toFixed(2)
    this.setState({ valor })
  }

  setAtributo = async (atributoid, obj) => {
    console.log("obj",obj)
    const novo = JSON.parse(JSON.stringify(this.state.atributos))
    novo[atributoid] = { ...obj, valorf: parseFloat(obj.valor).toFixed(2) }
    atributos = novo
    console.log(novo)
    await this.setState({
      atributos: atributos
    })

    this.calculaTotal()
  }

  adicionar = () => {
    const produto = this.props.navigation.state.params.produto
    const loja = this.props.navigation.state.params.loja
    const erros = []
    produto.produto_atributos.map( item => {
      if (!this.state.atributos[item.id].id){
        erros.push("Selecione o "+item.nome)
      }
    })

    if (erros.length>0){
      alert(erros[0])
    }else{
      const produto_opc = { ...this.state }
      console.log("produto",produto)
      console.log("loja",loja)
      console.log("produtoPC",produto_opc)
    addProduto({ loja, produto, produto_opc })
    
    this.props.navigation.navigate('pedido')
    }
    
  }

  setAdicionais = async obj => {
    let novo = []
    Object.keys(obj).forEach(id => {
      if (obj[id].quantidade > 0) {
        let adc = obj[id]
        adc = {
          ...adc,
          valorf: (parseFloat(adc.valor) * adc.quantidade).toFixed(2)
        }
        novo.push(adc)
      }
    })
    await this.setState({
      adicionais: novo
    })
    this.calculaTotal()
  }

  gotoAtributos = atributo => {
    this.props.navigation.navigate('atributos', {
      atributo: atributo,
      atual: this.state.atributos[atributo.id].id,
      onSelect: this.setAtributo
    })
  }
  gotoAdicionais = opcoes => {
    this.props.navigation.navigate('adicionais', {
      opcoes: opcoes,
      atual: this.state.adicionais,
      onConfirm: this.setAdicionais
    })
  }

  render () {
    const produto = this.props.navigation.state.params.produto
    console.log(produto)
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Produto</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <Text style={styles.titulo}>
              {produto.nome} - R$ {parseFloat(produto.valor).toFixed(2)}
            </Text>
            <Text style={styles.subtitulo}>{produto.legenda}</Text>
          </View>
          {produto.produto_atributos.length == 0 ? null : (
            <List>
              <Separator bordered>
                <Text>Atributos</Text>
              </Separator>
              {produto.produto_atributos.map((item, index) => (
                <ListItem
                  onPress={() => this.gotoAtributos(item)}
                  key={index}
                >
                  <Body>
                    <Text>{item.nome}</Text>
                    {!this.state.atributos[item.id].id ? (
                      <Text style={{color:colors.danger}}>Selecione</Text>
                    ) : (
                      <Text note>
                        {this.state.atributos[item.id].nome}{' '}
                        {this.state.atributos[item.id].valor == undefined ? "" : ' - R$ ' + this.state.atributos[item.id].valorf}
                      </Text>
                    )}
                  </Body>
                  <Right>
                    <Icon name='arrow-forward' />
                  </Right>
                </ListItem>
              ))}
            </List>
          )}
          <List>
            <Separator bordered>
              <Text>Adicionais</Text>
            </Separator>
            <ListItem onPress={() => this.gotoAdicionais(produto.adicionais)}>
              <Body>
                <Text>Escolha os adicionais (opcional)</Text>
                {this.state.adicionais.map(adicional => (
                  <Text note key={adicional.id}>
                    {adicional.quantidade} | {adicional.nome} - R${' '}
                    {adicional.valorf}
                  </Text>
                ))}
              </Body>
              <Right>
                <Icon name='add' />
              </Right>
            </ListItem>
            <Separator bordered />
          </List>
          <List>
            <MkNumberPicker
              onChange={async (e) => {
                await this.setState({ quantidade: e })
                this.calculaTotal()
              }}
              titulo='Quantidade'
              inicial='1'
              min='1'
              max='20'
            />
          </List>
          <Separator bordered />
          <ListItem>
            <Body>
              <Text>Valor Total: R$ {this.state.valor}</Text>
            </Body>
          </ListItem>
          <Separator bordered>
            <Text>Observações no produto</Text>
          </Separator>
          <View style={styles.container}>
            <Textarea
              rowSpan={3}
              bordered
              placeholder='Algum detalhe que precisamos saber?'
              onChangeText={text => this.setState({ observacoes: text })}
            />
          </View>
          <View style={styles.container}>
            <Button iconLeft block onPress={() => this.adicionar()}>
              <Icon name='ios-cart' />
              <Text>Adicionar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

export default connect(store => ({ store }))(produto)
