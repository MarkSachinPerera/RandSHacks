import React from 'react';
import { Header, Image, Table, Container } from 'semantic-ui-react';
import { leaderboardSRoute } from '../../constants/strings';
import ax from '../../axios/axios';
import Loader from '../../components/loader/Loader';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      top10Users: [],
    };
  }

  async componentDidMount() {
    let top10Users = [];
    this.setState({ fetching: true });
    let temp = await ax.get(leaderboardSRoute);
    top10Users = Object.values(temp.data['Leaderboard']);
    console.log(top10Users);
    this.setState({ top10Users, fetching: false });
  }
  renderLeaderboard() {
    return (
      <Container textAlign="center">
        <Header as="h1">Leaderboard</Header>
        <Table celled structured style={{ margin: '10px' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.top10Users.map((user) => {
              return (
                <Table.Row key={user.name}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={user.imgurl} rounded size="mini" />
                      <Header.Content>{user.name}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{user.score}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  render() {
    const { fetching } = this.state;
    {
      return fetching ? <Loader visible={fetching} /> : this.renderLeaderboard();
    }
  }
}
