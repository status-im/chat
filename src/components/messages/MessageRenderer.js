import React from 'react';
import { Emoji } from 'emoji-mart';
import SyntaxLookup from '../../utils/syntaxLookup';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Linkify from 'react-linkify';

const isCode = (message) => {
  return message[2] === "`" && SyntaxLookup[message.slice(0,2)]
}

// TODO  use regex for code parsing / detection. Add new line detection for shift+enter
const MessageRenderer = ({ message }) => {
  if (isCode(message)) {
    return (<SyntaxHighlighter language={SyntaxLookup[message.slice(0,2)]} style={atomDark}>{message.slice(3)}</SyntaxHighlighter>)
  }

  const emojis = [];
  let match;
  const regex1 = RegExp(/:[\-a-zA-Z_+0-9]+:/g);
  while ((match = regex1.exec(message)) !== null) {
    emojis.push(<Emoji emoji={match[0]} size={16} />);
  }

  const parts = message.split(regex1);
  parts.forEach((part, i) => {
    parts[i] = <span className="match" key={i}>{part}{emojis[i]}</span>;
  });

  return (<Linkify><span style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>{parts}</span></Linkify>)
};


export default MessageRenderer;
