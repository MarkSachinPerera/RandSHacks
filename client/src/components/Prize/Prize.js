import React, { Component } from 'react';
import { Container, Item, Image, Table, Header, Button } from 'semantic-ui-react';
import ax from '../../axios/axios';

export default class Prize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      prizes: [],
      redeemBtnDisabled: false,
      btnId: -1,
    };
  }

  fetchPrizes = async () => {
    try {
      const response = await ax.get('/prizes/all');
      if (response.status !== 200) {
        throw new Error('data not found');
      }
      return Object.values(response.data['Prizes']);
    } catch (e) {
      console.error(e);
      return {};
    }
  };
  async componentDidMount() {
    const prizes = await this.fetchPrizes();
    this.setState({ fetching: false, prizes });
  }

  renderPrizes = () => {
    return (
      <Container textAlign="center">
        <Header as="h1" color="blue" style={{ margin: '1em' }}>
          Prizes
        </Header>
        <Table style={{ margin: '10px' }} basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Points needed</Table.HeaderCell>
              <Table.HeaderCell>Redeem</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.prizes.map((prize, index) => {
              return (
                <Table.Row key={prize.name}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image
                        src="https://img.icons8.com/cute-clipart/64/000000/gift.png"
                        rounded
                        size="mini"
                      />
                      <Header.Content>{prize.name}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{prize.points}</Table.Cell>
                  <Table.Cell>
                    <Button
                      id={index}
                      size="small"
                      positive
                      disabled={index === this.state.btnId ? this.state.redeemBtnDisabled : false}
                      onClick={() => this.setState({ redeemBtnDisabled: true, btnId: index })}
                    >
                      Redeem
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  };

  render() {
    return <>{this.renderPrizes()}</>;
  }
}
