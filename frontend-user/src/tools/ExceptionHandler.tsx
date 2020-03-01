import React from "react";

class ExceptionHandler extends React.Component {
  state = { error: "" };
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error });
    setTimeout(() => {
      this.setState({ error: "" });
    }, 10000);
  }
  render() {
    return !!this.state.error
      ? JSON.stringify(this.state.error)
      : this.props.children;
  }
}

export default ExceptionHandler;
