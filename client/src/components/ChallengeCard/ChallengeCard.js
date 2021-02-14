import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function ChallengeCard({ onClick, color, image }) {
  return (
    <Card fluid centered onClick={onClick} color={color}>
      <Image src={image} />
      <Card.Content>
        <Card.Header>{'Some data'}</Card.Header>
        <Card.Meta>Created on: {'Some date'}</Card.Meta>
      </Card.Content>
    </Card>
  );
}
