import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function ChallengeCard({ name, secure_url, onClick, color }) {
  return (
    <Card onClick={onClick} color={color}>
      <Image src={secure_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Created on: {'reee'}</Card.Meta>
      </Card.Content>
    </Card>
  );
}
