import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import UserAvatar from './UserAvatar';
import MessageRenderer from './messages/MessageRenderer';
import YoutubeMessage from './messages/youtube';
import SpotifyMessage from './messages/spotify';
import ImageMessage from './messages/image';
import IpfsImageMessage from './messages/ipfsImage';

const Message = ({message, pubkey, username, ipfs}) => (
  <Fragment>
    <ListItem>
      <UserAvatar pubkey={pubkey} />
      <ListItemText primary={`${username}`} secondary={<MessageRenderer message={message}/>}/>
    </ListItem>
    <YoutubeMessage message={message} />
    <SpotifyMessage message={message} />
    <ImageMessage message={message} />
    <IpfsImageMessage message={message} ipfs={ipfs} />
  </Fragment>
);

export default Message;
