import React, { Component } from 'react';
import ChallengeCard from '../ChallengeCard/ChallengeCard';
import {Container, Grid, Header, List, Segment} from 'semantic-ui-react';
import ax from "../../axios/axios";
import CustomLoader from "../loader/Loader";
import { Breadcrumb } from "semantic-ui-react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      challenges: [
        {
          'name': 'Meditation',
        },
        {},
      ],
      isAuthenticated: this.props.isAuthenticated,
    };
  }

  fetchFeed = async () => {
      try {
          const response = await ax.get('/feed')
          console.log('/feed', response)
          if (response.status !== 200) {
              throw new Error('data not found' )
          }

          return response.data['Feed']

      } catch (e) {
          console.error(e)
          return {}
      }
  }

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
      return (
          <List>
              {feed && feed.map((a) => {
                  return (
                      <List.Item key={a}>
                          <ChallengeCard
                              data={a}
                          />
                      </List.Item>
                  );
              })}
          </List>
      );
  };

  async componentDidMount() {
      const feed = await this.fetchFeed()
      this.setState({fetching: false, feed: feed})
  }

    render() {
    const { fetching } = this.state;

    if (fetching) return <CustomLoader visible={true}/>

    return (
      <Grid textAlign="center" padded columns={3}>
        <Grid.Column>
          <Header> Challenges</Header>
          {this.renderChallenges()}
        </Grid.Column>
        <Grid.Column>
          <Header> Feed</Header>
            <Breadcrumb>
                {this.renderFeed(this.state.feed)}
            </Breadcrumb>
        </Grid.Column>
      </Grid>
    );
  }
}
