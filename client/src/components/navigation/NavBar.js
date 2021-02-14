import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AuthService from '../../services/AuthService';
import { homeRoute, leaderboardRoute, prizesRoute } from '../../constants/strings';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Current Challenges',
    };
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case 'Leaderboard':
        this.props.history.push(leaderboardRoute);
        break;

      case 'Current Challenges':
        this.props.history.push(homeRoute);
        break;
      case 'Prizes':
        this.props.history.push(prizesRoute);
        break;
      default:
        break;
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary color="blue" inverted>
        <Menu.Item name="Friendfy" />
        <Menu.Item
          name="Current Challenges"
          active={activeItem === 'Current Challenges'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Leaderboard"
          active={activeItem === 'Leaderboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item name="Prizes" active={activeItem === 'Prizes'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <b>Score: {this.props.score} points</b>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
