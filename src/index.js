/**
 * Hyper File.io
 */

// Import third party modules
import Dropzone from 'react-dropzone'
import { css } from 'glamor'

export function decorateTerms(Terms, { React }) {
  const { Component } = React;

  return class extends Component {
    static displayName() {
      return 'Hyper File.io'
    }

    constructor() {
      super()
      this.onFileDrop = this.onFileDrop.bind(this)

      this.state = {
        message: 'Drop files here',
        files: []
      }
    }

    onFileDrop(acceptedFiles) {
      this.setState({
        message: 'Uploading...',
        files: acceptedFiles[0]
      })
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
