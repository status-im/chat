import React, { PureComponent } from 'react';

class WhoIsTyping extends PureComponent {

  // TODO: all this logic will soon come from status chat lib and much more efficient
  whoIsTyping() {
    const { users, usersTyping, currentChannel } = this.props;
    const currentTime = new Date().getTime();

    const typingInChannel = usersTyping[currentChannel];
    const typingUsers = [];
    for (let pubkey in typingInChannel) {
      const lastTyped = typingInChannel[pubkey];
      if (!users[pubkey]) continue;
      if (currentTime - lastTyped > 3*1000 || currentTime < lastTyped) continue;
      typingUsers.push(users[pubkey].username)
    }
    return typingUsers;
  }

  render() {
    const userList = this.whoIsTyping();
    return (
      <div style={{ textAlign: 'center' }}>
        {!userList.length ? "" : `${userList.join(',')} is typing`}
      </div>
    )
  }
}

export default WhoIsTyping;
