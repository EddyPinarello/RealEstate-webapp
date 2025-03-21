import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/authContext.jsx";
import { format } from "timeago.js";
import axios from "axios";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  console.log(chats);
  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chats/${id}`, {
        withCredentials: true,
      });
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    console.log(chat.id);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/messages/${chat.id}`,
        { text },
        {
          withCredentials: true,
        }
      );
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await axios.put(`http://localhost:3000/api/messages/${chat.id}`, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
  });
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats && chats.length > 0 ? (
          chats.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "no-avatar.jpg"} alt="" />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
