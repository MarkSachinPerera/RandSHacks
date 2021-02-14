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

  getUsersWithBadge = () => {
    const users = this.state.top10Users.slice();

    let sortedUsers = users.sort(function (a, b) {
      return b.score - a.score;
    });

    const goldBadge = 'https://img.icons8.com/officel/16/000000/gold-medal.png';
    const silverBadge = 'https://img.icons8.com/color/48/000000/olympic-medal-silver.png';
    const bronzeBadge = 'https://img.icons8.com/officexs/16/000000/olympic-medal-bronze.png';

    for (let i = 0; i < users.length; i++) {
      if (i === 0) sortedUsers[i].badgeColor = goldBadge;
      else if (i <= 3) sortedUsers[i].badgeColor = silverBadge;
      else sortedUsers[i].badgeColor = bronzeBadge;
    }

    return sortedUsers;
  };

  async componentDidMount() {
    let top10Users = [];
    this.setState({ fetching: true });
    let temp = await ax.get(leaderboardSRoute);
    top10Users = Object.values(temp.data['Leaderboard']);
    console.log(top10Users);
    this.setState({ top10Users, fetching: false });
  }

  renderLeaderboard() {
    const users = this.getUsersWithBadge();

    return (
      <Container textAlign="center">
        <Header as="h1" color="blue" style={{ margin: '1em' }}>
          Leaderboard
        </Header>
        <Table style={{ margin: '10px' }} basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => {
              return (
                <Table.Row key={user.name}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={user.badgeColor} rounded size="mini" />
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
    return fetching ? <Loader visible={fetching} /> : this.renderLeaderboard();
  }
}
