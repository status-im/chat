import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

const UserAvatar = ({pubkey}) => (
  <Avatar>
    <ListItemAvatar>
       {pubkey && <Jazzicon diameter={40} seed={jsNumberForAddress(pubkey)}/>}
    </ListItemAvatar>
  </Avatar>
);

export default UserAvatar;
