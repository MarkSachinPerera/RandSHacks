import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function ChallengeCard({ onClick, color }) {
  return (
    <Card onClick={onClick} color={color}>
      <Image src={'Some source'} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{'Some data'}</Card.Header>
        <Card.Meta>Created on: {'Some date'}</Card.Meta>
      </Card.Content>
    </Card>
  );
}
