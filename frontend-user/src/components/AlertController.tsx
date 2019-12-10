import React from 'react';
import { IonAlert } from '@ionic/react';
import { withLocalize } from 'react-localize-redux';
import { API } from '../redux/store_config';

interface IAlertControllerProps {
  translate?: any,
}

interface IAlertControllerState {
}

class AlertController extends React.Component<IAlertControllerProps, IAlertControllerState> {
  state = { open: false, message: "" };
  requestInterceptor: any = undefined;
  responseInterceptor: any = undefined;

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  setMessage = (message: string) => this.setState({ message });

  componentDidMount() {
    // Set axios interceptors
    this.requestInterceptor = API.interceptors.request.use(req => {
      this.setState({ message: "" });
      return req;
    });

    this.responseInterceptor = API.interceptors.response.use(
      res => res,
      error => {
        console.log(JSON.stringify(error));
        console.log(error.code);
        if (error.code === "ECONNABORTED") {
          this.setMessage(this.props.translate("alert.networkError"));
          this.open();
        } if (!!error.response && !!error.response.data && !!error.response.data.message) {
          this.setMessage(this.props.translate("server." + error.response.data.message));
          this.open();
        } else if (error.message === "Network Error") {
          this.setMessage(this.props.translate("alert.networkError"));
          this.open();
        } else if (error.code === 401) {
          this.setMessage(this.props.translate("server.wrongCredentials"));
          this.open();
        } 
      }
    );
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (!!error && !!error.message) {
      this.setMessage(error.message);
      this.open();
    }
  }

  render() {
    const { translate } = this.props;
    return <>
      <IonAlert
        isOpen={this.state.open}
        onDidDismiss={this.close}
        header={translate("alert.title")}
        message={this.state.message}
        buttons={[translate("ok")]}
      />
      {this.props.children}
    </>;
  }
}

export default withLocalize((props) => <AlertController {...props} />);
