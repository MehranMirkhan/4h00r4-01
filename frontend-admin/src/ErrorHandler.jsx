import React from 'react';
import { withAlert } from 'react-alert';
import { API } from 'src/redux/store_config';
import { Message } from 'semantic-ui-react';


export const AlertTemplate = ({ style, options, message, close }) => {
  const type = { [options.type]: true };
  return <div style={style}>
    <Message
      onDismiss={close}
      content={<p style={{ paddingLeft: 16 }}>{message}</p>}
      {...type}
    />
  </div>
};


class ErrorHandler extends React.Component {
  state = {
    error: null
  };

  componentDidMount() {
    // Set axios interceptors
    this.requestInterceptor = API.interceptors.request.use(req => {
      this.setState({ error: null });
      return req;
    });

    this.responseInterceptor = API.interceptors.response.use(
      res => res,
      error => {
        if (!!error.response) {
          console.log(error.response.data);
          this.props.alert.error(error.response.data);
        }
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
    API.interceptors.request.eject(this.requestInterceptor);
    API.interceptors.response.eject(this.responseInterceptor);
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    this.props.alert.error(error);
  }

  render() {
    return this.props.children;
  }
}

export default withAlert()(ErrorHandler);
