import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const CodeBlock = ({ inline, className = "", children, ...props }) => {

  const match = /language-(\w+)/.exec(className);
  let language = match?.[1] || "text";

  if (language === "js") language = "javascript";

  const codeContent = String(children).replace(/\n$/, "");
  const cleanedCode = codeContent.replace(
    /^(javascript|html|css|python|java|cpp|c|csharp|php|ruby|go|rust|swift)\s*/,
    ""
  );

  <div className="mockup-code w-full">
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      {...props}
    >
      {cleanedCode}
    </SyntaxHighlighter>
  </div>
};

const RichContent = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize, remarkGfm]}
      disallowedElements={["p"]}
      unwrapDisallowed
    >
      {content}
    </ReactMarkdown>
  );
};

const Sources = ({ message }) => {
  if (!message.content || message.content.length === 0) return;

  return (

    <details className="collapse bg-base-100">
      <summary className="collapse-title font-semibold text-sm">Sources</summary>
      <div className="collapse-content text-sm">
        <ul className="list-disc pl-4">
          {message.content.map((source, index) => Object.entries(source).map(s =>
            <li key={`${index}=${s[0]}`} className="text-blue-600">
              <span className="font-bold">{s[0]}</span>:{s[1]}
            </li>
          ))}
        </ul>
      </div>
    </details>)
}

const renderMessageContent = (message) => {

  switch (message.type) {

    case "code":
      return (<CodeBlock>{message.content}</CodeBlock>)

    case "html":
      return <div dangerouslySetInnerHTML={{ __html: message.content }} className="border p-2 rounded bg-gray-100" />;

    case "sources":
      return <Sources message={message} />

    case "delta":
    case "delta_encoding":
      return <RichContent content={message.content} />

    default:
      return <p className="text-red-500">Unknown message type: {message.type}. Message: {JSON.stringify(message)} </p>;
  }
};

const MessageUser = ({ message }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">
        {message.content}
      </div>
    </div>

  )
}

const MessageAssistant = ({ message, isStreaming }) => {
  return (
    <div className={`chat ${message.sender}`}>
      {renderMessageContent(message)}

    </div>
  )
}

const MessageComponent = ({ message, isStreaming }) => {

  return (
    <>
      {message.sender === 'user' && <MessageUser message={message} />}
      {message.sender === 'assistant' && <MessageAssistant message={message} isStreaming={isStreaming} />}
    </>
  );
};

export default MessageComponent;