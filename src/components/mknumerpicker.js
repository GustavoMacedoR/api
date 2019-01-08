import React, { Component } from "react";
import {
  Body,
  Left,
  Right,
  ListItem,
  Text,
  Button,
  Icon,
  Badge
} from "native-base";
import { styles, colors } from "../styles";
export default class mknumberpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: props.inicial
    };
  }
  getQuantidade = () => {
    return this.state.quantidade;
  };
  setQuantidade = qtd => {
    const novo = parseInt(this.state.quantidade) + qtd;
    if (novo >= this.props.min && novo <= this.props.max) {
      this.setState({ quantidade: novo });
      this.props.onChange(novo)
    }
  };

  componentDidMount() {
      this.props.onChange(this.getQuantidade())
  }
  render() {
    return (
      <ListItem
        icon
        onPress={() => this.setQuantidade(1)}
      >
        <Left>
          <Button
            danger
            light={this.getQuantidade() <= this.props.min}
            transparent
            onPress={() => this.setQuantidade(-1)}
          >
            <Icon name="ios-remove-circle" />
          </Button>
        </Left>
        <Body>
          <Text>{this.props.titulo}</Text>
          {this.props.subtitulo ? <Text note>{this.props.subtitulo}</Text> : null}
        </Body>
        <Right>
          <Badge
            style={{
              backgroundColor:
                this.getQuantidade() > 0
                  ? colors.primary
                  : colors.light
            }}
          >
            <Text>{this.getQuantidade()}</Text>
          </Badge>
          <Icon
            name="ios-add-circle"
            style={{ fontSize: 32, color: colors.success }}
          />
        </Right>
      </ListItem>
    );
  }
}
