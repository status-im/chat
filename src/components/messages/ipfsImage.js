import React, { Fragment, PureComponent } from 'react';
import { Matcher } from '@areknawo/rex'
import { getFile } from '../../utils/ipfs';

const ipfsMatcher = new Matcher().begin().find('/ipfs/');

class IpfsImageMessage extends PureComponent {

  state = {
    imgUrl: null
  };

  componentDidMount() {
    const { message } = this.props;
    if (ipfsMatcher.test(message)) this.getImageFromIpfs();
  }

  getImageFromIpfs = async () => {
    const { ipfs, message } = this.props;
    const files = await getFile(ipfs, message);
    const { content } = files[0];
    const arrayBufferView = new Uint8Array(content);
    const blob = new Blob([ arrayBufferView ], { type: "image/jpeg" });
    const imgUrl = URL.createObjectURL(blob);
    this.setState({ imgUrl });
  };

  render() {
    const { imgUrl } = this.state;
    return (
      <Fragment>
        {!!imgUrl && <img src={imgUrl} alt='ipfs' style={{maxWidth: '90%'}} />}
      </Fragment>
    );
  };
}


export default IpfsImageMessage;
