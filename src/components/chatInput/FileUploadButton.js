// TODO: this should be a functional component but for now at least the logic is isolated here
import React, { Fragment, PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import { uploadFileAndSend } from '../../utils/ipfs';

class FileUploadButton extends PureComponent {

  uploadFileDialog() {
    this.fileInput.click();
  }

  fileChangedHandler(event) {
    const { ipfs, sendMessage } = this.props;
    const file = event.target.files[0];
    uploadFileAndSend(ipfs, file, sendMessage);
  }

  render() {
    return (
      <Fragment>
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }}
          onChange={this.fileChangedHandler.bind(this)}
          style={{display: 'none'}}
        />

        <Button onClick={(e) => this.uploadFileDialog()}><AddCircle /></Button>
      </Fragment>
    );
  }
}

export default FileUploadButton;
