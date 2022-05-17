import React from "react";
import { Card, Placeholder, Row, Col } from "react-bootstrap";

const ListingSkeleton = ({ count }) => {
  return (
    <Row className="gy-3">
      {[...Array(count)].map((item, index) => (
        <Col key={index} lg={4} md={6}>
          <Card>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} />
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} />
                <Placeholder xs={6} /> <Placeholder xs={8} />
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} />
                <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button
                variant="primary"
                xs={3}
                className="d-block ms-auto"
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListingSkeleton;
