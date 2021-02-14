import React, { Component } from 'react';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import { Card, Feed, Grid, Image, Header, Divider, Segment } from 'semantic-ui-react';
import ax from '../../axios/axios';
import CustomLoader from '../loader/Loader';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      challenges: [],
    };
  }

  fetchFeed = async () => {
    try {
      const response = await ax.get('/feed');

      if (response.status !== 200) {
        throw new Error('data not found');
      }

      return response.data['Feed'];
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  fetchChallenges = async () => {
    try {
      const response = await ax.get('/challenges/get');

      if (response.status !== 200) {
        throw new Error('data not found');
      }
      console.log(response.data.json_list);
      return response.data['json_list'];
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  renderChallenges = () => {
    return (
      <>
        {this.state.challenges.map((challenge, idx) => {
          return (
            <ChallengeCard
              key={idx}
              header={challenge[1]}
              data={challenge[2]}
              image={
                'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1375&q=80'
              }
              onClick={() => {
                this.props.updateScore(challenge[2]);
              }}
              buttonOnClick={this.props.handleButtonClick}
            />
          );
        })}
      </>
    );
  };

  renderFeed = (feed) => {
    return (
      <>
        {feed &&
          feed.map((a, index) => {
            return (
              <Feed.Event key={index}>
                <Feed.Label>
                  <Image src="https://semantic-ui.com/images/avatar/small/chris.jpg" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User> {a}</Feed.User>
                    <Feed.Date>1 Hour Ago</Feed.Date>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            );
          })}
      </>
    );
  };

  async componentDidMount() {
    console.log(this.props.updateScore);
    const feed = await this.fetchFeed();
    let challenges = await this.fetchChallenges();
    this.setState({ fetching: false, feed: feed, challenges });
  }

  render() {
    const { fetching } = this.state;

    if (fetching) return <CustomLoader visible={fetching} />;

    return (
      <>
        <Divider as="h4" className="header" horizontal style={{ textTransform: 'uppercase' }}>
          <Header>Challenges</Header>
        </Divider>
        <Grid style={{ margin: '0.5em' }}>
          <Grid.Row style={{ marginLeft: '12em' }}>{this.renderChallenges()}</Grid.Row>

          <Grid.Row centered columns={1}>
            <Divider as="h4" className="header" horizontal style={{ textTransform: 'uppercase' }}>
              <Header>Friend's Feed</Header>
            </Divider>
            <Grid.Column width={6}>
              <Segment style={{ overflow: 'auto', maxHeight: '400px' }}>
                <Feed>{this.renderFeed(this.state.feed)}</Feed>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
