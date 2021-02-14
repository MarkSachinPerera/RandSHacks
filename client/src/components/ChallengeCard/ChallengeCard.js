import React, { useState } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default function ChallengeCard({ onClick, color = 'blue', header, data, image }) {
  const [buttonType, setButtonType] = useState('Complete Challenge');

  const handleButtonClick = () => {
    if (buttonType === 'Start Challenge') {
      setButtonType('Stop');
    } else {
      setButtonType('Start Challenge');
    }
  };

  const renderButtonColor = () => {
    let bt = 'blue';
    if (buttonType === 'Start Challenge') {
      bt = 'blue';
    } else {
      bt = 'negative';
    }
    return bt;
  };
  return (
    <Card centered onClick={onClick} color={color} style={{ margin: '1em' }}>
      <Image src={image} />
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>Points: {data}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button size="small" color={renderButtonColor()} onClick={handleButtonClick}>
          {buttonType}
        </Button>
      </Card.Content>
    </Card>
  );
}
