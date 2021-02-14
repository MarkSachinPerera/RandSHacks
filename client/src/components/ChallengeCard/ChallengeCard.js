import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function ChallengeCard({ onClick,color='blue', header, data, image }) {
  return (
    <Card fluid centered onClick={onClick} color={color}>
      <Image src={image} />
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{data}</Card.Meta>
      </Card.Content>
    </Card>
  );
}
