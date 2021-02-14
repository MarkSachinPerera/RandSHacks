import React, { Component } from 'react';
import Loader from '../loader/Loader';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import { Grid, Header, List } from 'semantic-ui-react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      challenges: [
        {
          '': '',
        },
        {},
      ],
      isAuthenticated: this.props.isAuthenticated,
    };
  }

  renderChallenges = () => {
    return (
      <>
        {this.state.challenges.map((challenge) => {
          return (
            <ChallengeCard
              image={
                'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
              }
              onClick={() => {}}
            />
          );
        })}
      </>
    );
  };

  renderFeed = () => {
    return (
      <List>
        <List.Item>
          {' '}
          <ChallengeCard onClick={() => {}} />
        </List.Item>
        <List.Item>
          {' '}
          <ChallengeCard onClick={() => {}} />
        </List.Item>
        <List.Item>
          {' '}
          <ChallengeCard onClick={() => {}} />
        </List.Item>
      </List>
    );
  };

  async componentDidMount() {}
  render() {
    const { fetching } = this.state;

    return (
      <Grid textAlign="center" padded columns={3}>
        <Grid.Column>
          <Header> Challenges</Header>
          {this.renderChallenges()}
        </Grid.Column>
        <Grid.Column>
          <Header> Feed</Header>
          {this.renderFeed()}
        </Grid.Column>
      </Grid>
    );
  }
}
