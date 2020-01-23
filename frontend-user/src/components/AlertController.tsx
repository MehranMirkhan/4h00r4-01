import React from "react";
import { connect } from "react-redux";
import { IonAlert } from "@ionic/react";
import { withLocalize } from "react-localize-redux";
import { API } from "../redux/store_config";
import { isAuthenticated, register, logout } from "../pages/Auth/Auth.reducer";

interface IAlertControllerProps {
  translate?: any;
  isAuth: boolean;
  hasMe: boolean;
  createNewUser: () => any;
  logout: () => any;
}

interface IAlertControllerState {}

export const AlertContext = React.createContext(
  (msg: string, type?: string) => {}
);

class AlertController extends React.Component<
  IAlertControllerProps,
  IAlertControllerState
> {
  state = { open: false, message: "", type: "error" };
  requestInterceptor: any = undefined;
  responseInterceptor: any = undefined;

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  setMessage = (message: string) => this.setState({ message });
  setType = (type: string) => this.setState({ type });

  componentDidMount() {
    // Set axios interceptors
    this.requestInterceptor = API.interceptors.request.use(req => {
      this.setState({ message: "" });
      return req;
    });

    this.responseInterceptor = API.interceptors.response.use(
      res => res,
      error => {
        if (error.code === "ECONNABORTED") {
          this.setMessage(this.props.translate("alert.networkError"));
          this.setType("alert.title.error");
          this.open();
        } else if (error.message === "Network Error") {
          this.setMessage(this.props.translate("alert.networkError"));
          this.setType("alert.title.error");
          this.open();
        } else if (error.response.status === 401) {
          if (this.props.isAuth) {
            if (!this.props.hasMe) {
              this.setMessage(
                this.props.translate("server.auth.wrongCredentials")
              );
              this.setType("alert.title.error");
              this.open();
            } else {
              console.log("Logging out");
              this.props.logout();
            }
          } else {
            this.props.createNewUser().then((_: any) => {
              window.location.reload();
            });
          }
        } else if (
          error.response.status === 400 ||
          error.response.status === 422
        ) {
          this.setMessage(this.props.translate("server.badRequest"));
          this.setType("alert.title.error");
          this.open();
        } else if (
          !!error.response &&
          !!error.response.data &&
          !!error.response.data.message
        ) {
          this.setMessage(this.props.translate(error.response.data.message));
          this.setType("alert.title.error");
          this.open();
        }
      }
    );
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (!!error && !!error.message) {
      this.setMessage(error.message);
      this.setType("alert.title.error");
      this.open();
    }
  }

  render() {
    const { translate } = this.props;
    const alertContext = (msg: string, type?: string) => {
      this.setMessage(translate(msg));
      this.setType(!!type ? type : "empty");
      this.open();
    };
    return (
      <>
        <IonAlert
          isOpen={this.state.open}
          onDidDismiss={this.close}
          header={translate(this.state.type)}
          message={this.state.message}
          buttons={[translate("ok")]}
        />
        <AlertContext.Provider value={alertContext}>
          {this.props.children}
        </AlertContext.Provider>
      </>
    );
  }
}

export default connect(
  (state: any) => ({ isAuth: isAuthenticated(state), hasMe: !!state.auth.me }),
  dispatch => ({
    createNewUser: () => dispatch(register() as any),
    logout: () => dispatch(logout())
  })
)(withLocalize((props: any) => <AlertController {...props} />));
