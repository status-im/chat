import React from 'react';
import TextField from '@material-ui/core/TextField';

const ChatTextInput = ({ref, handleTyping, handleChange, handleBlur, chatInput}) => (
  <TextField
    id="chatInput"
    ref={ref}
    multiline
    style={{ width: 'auto', flexGrow: '0.95', margin: '2px 0 0 0' }}
    label="Type a message..."
    type="text"
    name="chatInput"
    margin="normal"
    variant="outlined"
    fullWidth
    onChange={handleChange}
    onKeyDown={handleTyping}
    onBlur={handleBlur}
    value={chatInput}
  />
)

export default ChatTextInput;
