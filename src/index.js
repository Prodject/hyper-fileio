// Import third party modules
const clipboardy = require('clipboardy');

export function decorateTerm(Term, { React, notify }) {
  return class extends React.Component {
    static displayName() {
      return 'Hyper File.io'
    }

    constructor(props) {
      super(props);

      this.state = {
        message: 'Drop files here',
        link: '',
      }

      this._processData = this._processData.bind(this);
      this._uploadFile = this._uploadFile.bind(this);
      this._onSuccess = this._onSuccess.bind(this);
      this._onError = this._onError.bind(this);
    }

    _processData(files) {
      const data = new FormData();
      data.append('file', files[0]);

      this.setState({
        message: 'Uploading...',
      });

      this._uploadFile(data);
    }

    _uploadFile(data) {
      fetch('https://file.io', {
        method: 'POST',
        body: data,
      })
      .then(response => response.json())
      .then(data => this._onSuccess(data))
      .then(() => this.setState({ message: 'Drop files here' }));
    }

    _onSuccess(data) {
      const { link } = data;

      this.setState({ link }, () => {
        clipboardy.writeSync(this.state.link);
        notify('🔗 Link copied to clipboard');
      });
    }

    _onError() {
      notify('😧 Something went wrong');
    }

    render() {
      return (
        <Term
          {...this.props}
          customChildren={(
            <div>
              <label style={style.container}>
                { this.state.message }
                <input
                  type='file'
                  id='file'
                  name='file'
                  style={style.input}
                  onChange={e => this._processData(e.target.files)}
                />
              </label>
            </div>
          )}
        />
      )
    }
  }
}

const style = {
  container: {
    border: '1px dashed #fff',
    borderRadius: '4px',
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    padding: '8px',
  },
  input: {
    opacity: 0,
    appearance: 'none',
    position: 'absolute',
    'z-index': 1,
    width: '100%',
  },
  label: {
    position: 'relative',
  }
};
