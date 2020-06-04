import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { formatDate } from '@/utils/functions';
//import ListGroup from 'react-bootstrap/ListGroup';

const PortfolioCard = ({ portfolio }) => {
  return (
    // <Card style={{ width: "18rem" }}>
    <Card>
      <Card.Header>Header</Card.Header>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{portfolio.title}</Card.Title>
        <Card.Subtitle className="text-muted">{portfolio.jobTitle}</Card.Subtitle>
        <Card.Text>
          {portfolio.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        {/* <Card.Link href="/">Home</Card.Link> */}
      </Card.Body>
      {/* <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup> */}
      <Card.Footer>
        <small className="text-muted">
          {formatDate(portfolio.startDate)} - {" "} {(portfolio.endDate && formatDate(portfolio.endDate)) || "Present"}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default PortfolioCard;
