import React, { Component } from 'react';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import { Card, Feed, Grid, Image, Header, Divider } from 'semantic-ui-react';
import ax from '../../axios/axios';
import CustomLoader from '../loader/Loader';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      challenges: [
        {
          name: 'Meditation',
        },
        {
          name: 'aaa',
        },

        {
          name: 'Meditaaaaation',
        },

        {
          name: 'Meditataaaaaaaaaion',
        },

        {
          name: 'Meditataaaion',
        },
      ],
      isAuthenticated: this.props.isAuthenticated,
    };
  }

  fetchFeed = async () => {
    try {
      const response = await ax.get('/feed');
      console.log('/feed', response);
      if (response.status !== 200) {
        throw new Error('data not found');
      }

      return response.data['Feed'];
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

  renderFeed = (feed) => {
    console.log(feed);
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
    const feed = await this.fetchFeed();
    this.setState({ fetching: false, feed: feed });
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
          <Grid.Row>
            <Card.Group>{this.renderChallenges()}</Card.Group>
          </Grid.Row>

          <Grid.Row centered columns={1}>
            <Divider as="h4" className="header" horizontal style={{ textTransform: 'uppercase' }}>
              <Header>Friend's Feed</Header>
            </Divider>
            <Grid.Column width={4}>
              <Feed>{this.renderFeed(this.state.feed)}</Feed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
