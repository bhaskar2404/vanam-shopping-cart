import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {}
  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
