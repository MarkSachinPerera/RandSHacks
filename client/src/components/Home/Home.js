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
    };
  }

  renderImages = () => {
    return (
      <Grid stackable>
        <Grid.Row columns={6}>
          {this.state.images.map((image) => {
            let date = new Date(image.uploaded_on);
            return (
              <Grid.Column key={image.public_id} style={{ marginBottom: '1em' }}>
                <ChallengeCard
                  name={image.name}
                  visibility={image.visibility}
                  secure_url={image.secure_url}
                  onClick={() => (window.location.href = image.secure_url)}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  };

  async componentDidMount() {
    let challenges = [];
  }
  render() {
    const { fetching } = this.state;
    return (
      <div style={{ margin: '1em' }}>
        {fetching ? <Loader visible={fetching} /> : this.renderImages()}
      </div>
    );
  }
}
