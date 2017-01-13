/**
 * Hyper File.io
 */


import fs from 'fs';

// Import third party modules
import Dropzone from 'react-dropzone';
import { css } from 'glamor';
import Request from 'request';

// Import own modules
import Copy from './utils/Copy'

export function decorateTerms(Terms, { React, notify }) {
  const { Component } = React;

  return class extends Component {
    static displayName() {
      return 'Hyper File.io'
    }

    constructor() {
      super()
      this.onFileDrop = this.onFileDrop.bind(this)
      this.handleError = this.handleError.bind(this)
      this.sendFile = this.sendFile.bind(this)

      this.state = {
        message: 'Drop files here',
        files: ''
      }
    }

    onFileDrop(acceptedFiles) {
      this.setState({
        message: 'Uploading...',
        files: acceptedFiles[0]
      }, () => {
        this.sendFile()
      });
    }

    handleError(code) {
      switch (code) {
      case ('ENOENT'):
        notify(`Error nº: ${code}`, 'No such file or directory');
        break;
      case ('EISDIR'):
        notify(`Error nº: ${code}`, 'Illegal operation on a directory');
        break;
      default:
        notify('Some error occurred, try again.');
      }
    }

    sendFile() {
      const req = Request.post('https://file.io', (error, response, body) => {
        if (error) {
          this.handleError(error)
        } else {
          const responseBody = JSON.parse(body)

          if (responseBody.success) {
            notify('Success upload', `URL ${responseBody.link} copied to clipboard`)
            Copy(responseBody.link)
            this.setState({
              message: 'Drop files here'
            })
          }
        }
      })
      const form = req.form()

      form.append('file', fs.createReadStream(this.state.files.path))
    }

    render() {
      return <Terms {...this.props} customChildren={(
        <div className="hyper-fileio">
          <Dropzone
            className={`${box}`}
            multiple={false}
            disableClick={true}
            onDrop={this.onFileDrop}>
            {this.state.message}
          </Dropzone>
        </div>
      )} />
    }
  }
}


const box = css({
  bottom: '0',
  border: '2px dashed #ffffff',
  borderRadius: '3px',
  color: '#ffffff',
  fontFamily: 'sans-serif',
  marginBottom: '10px',
  marginRight: '10px',
  opacity: '0.2',
  padding: '10px',
  position: 'absolute',
  right: '0',
  transition: '.2s all',
  ':hover': {
    opacity: 1
  }
})
