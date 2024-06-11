import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IconType } from 'react-icons';

interface TitleComponentProps {
  title: string;
  icon?: IconType;
  iconColor?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ title, icon: Icon, iconColor = "black" }) => {
  const titleStyle = {
    backgroundColor: '#2e2e2e', // Dunklere Graufarbe
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', // Textfarbe auf Weiß 
  };

  const iconStyle = {
    marginRight: '25px',
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div style={titleStyle}>
          {Icon && <Icon size={48} color={iconColor} style={iconStyle} />}
            <h1 className="text-center">{title}</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TitleComponent;
