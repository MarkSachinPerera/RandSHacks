import React, { Component } from 'react';
import Loader from '../loader/Loader';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import { Grid } from 'semantic-ui-react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      challenges: [],
      isAuthenticated: this.props.isAuthenticated,
    };
  }

  renderChallenges = () => {
    return (
      <Grid stackable>
        <Grid.Row columns={6}>
          {this.state.challenges.map((challenge) => {
            return (
              <Grid.Column key={challenge.public_id} style={{ marginBottom: '1em' }}>
                <ChallengeCard onClick={() => {}} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  };

  async componentDidMount() {}
  render() {
    const { fetching } = this.state;
    return (
      <div style={{ margin: '1em' }}>
        {fetching ? <Loader visible={fetching} /> : this.renderChallenges()}
      </div>
    );
  }
}
