import MessageComponent from "./MessageComponent";

export default ({ messages, isStreaming }) => (

  messages.map((message, index) => (
    <MessageComponent key={`message-${index}`} message={message} isStreaming={isStreaming}/>
  ))
)