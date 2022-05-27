import React, { useState } from "react";
import { Accordion, Button, Image, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import MessageForm from "../components/Forms/MessageForm";
import defaultPfp from "../assets/images/default-pfp.jpeg";
import { deleteMessage } from "../redux/usersSlice";
import { setAlert } from "../redux/alertSlice";

const InboxPage = () => {
  const { user } = useSelector((state) => state.users);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const dispatch = useDispatch();

  const handleReply = (id) => {
    setReceiverId(id);
    setShowMessageForm(true);
    console.log(id);
  };

  const handleDelete = (messageId) => {
    console.log(messageId);
    dispatch(deleteMessage({ id: messageId }))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            variant: "success",
            message: "Message successfully deleted!",
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
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
              _id: messageId,
            }) => (
              <ListGroup.Item key={messageId} className="border-0">
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
                      <div>
                        <h6>{`From: ${senderName}`}</h6>
                        <p className="fw-light">{messageBody}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            handleDelete(messageId);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleReply(senderId)}
                        >
                          Reply
                        </Button>
                      </div>
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
