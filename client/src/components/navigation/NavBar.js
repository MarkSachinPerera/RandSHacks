import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AuthService from '../../services/AuthService';
import { homeRoute, leaderboardRoute } from '../../constants/strings';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Current Challenges',
      isAuthenticated: AuthService.isAuthenticated(),
      authString: AuthService.isAuthenticated() ? 'Logout' : 'Login',
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
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary>
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
          <Menu.Item
            name={this.state.authString}
            active={activeItem === this.handleItemClick}
            onClick={() => {
              AuthService.authRouteHandler(this.props.history);
            }}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
