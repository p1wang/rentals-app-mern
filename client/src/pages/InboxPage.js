import React, { useState } from "react";
import { Accordion, Button, Image, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import MessageForm from "../components/Forms/MessageForm";
import defaultPfp from "../assets/images/default-pfp.jpeg";

const InboxPage = () => {
  const { user } = useSelector((state) => state.users);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [receiverId, setReceiverId] = useState("");

  const handleReply = (id) => {
    setReceiverId(id);
    setShowMessageForm(true);
    console.log(id);
  };

  return (
    <>
      <ListGroup style={{ maxWidth: "500px", margin: "auto" }}>
        {user?.result?.messages.length > 0 ? (
          user?.result?.messages.map(
            ({
              messageTitle,
              messageBody,
              senderName,
              senderId,
              senderPfp,
              _id,
            }) => (
              <ListGroup.Item key={_id} className="border-0">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span>
                        <Image
                          src={senderPfp ? senderPfp : defaultPfp}
                          width="40px"
                          roundedCircle
                          alt="profile pic"
                          className="me-4"
                        />
                        {messageTitle}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h6>{`From: ${senderName}`}</h6>
                      <p>{messageBody}</p>
                      <Button
                        className="d-block ms-auto"
                        onClick={() => handleReply(senderId)}
                      >
                        Reply
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ListGroup.Item>
            )
          )
        ) : (
          <span className="d-block text-center">No messages yet.</span>
        )}
      </ListGroup>
      <MessageForm
        showMessageForm={showMessageForm}
        setShowMessageForm={setShowMessageForm}
        senderName={user?.result?.name}
        receiverId={receiverId}
      />
    </>
  );
};

export default InboxPage;
