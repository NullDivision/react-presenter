// @flow

import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const rootNode = document.getElementById('root');
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;

  .overlay { bottom: 0; position: absolute; right: 0; }
  .pages > * { height: 100%; width: 100%; }
`;

const Pages = ({ activePage, children, reportPageCount }) => {
  reportPageCount(children.length);

  return <div className="pages">
    {React.Children.map(children, (child, index) => activePage === index ? child : null)}
  </div>;
};

class Presenter extends React.Component<{}, { activePage: number, pageCount: number }> {
  static getDerivedStateFromProps(nextProps, { activePage, pageCount }) {
    if (activePage >= pageCount) return { activePage: 0 };
    if (activePage < 0) return { activePage: pageCount - 1 };

    return null;
  }

  state = { activePage: 0, pageCount: 0 };
  handleChange = (modifier) => () => this.setState(({ activePage }) => ({ activePage: activePage + modifier }));
  handlePageCount = (pageCount) => this.state.pageCount !== pageCount && this.setState({ pageCount });

  render() {
    const { activePage } = this.state;

    return (
      <Container>
        <Pages activePage={activePage} reportPageCount={this.handlePageCount}>
          <div>Hello world!</div>
          <div>Hello React!</div>
        </Pages>

        <div className="overlay">
          <button onClick={this.handleChange(-1)}>Back</button>
          <button onClick={this.handleChange(1)}>Forward</button>
        </div>
      </Container>
    );
  }
}

if (rootNode) {
  ReactDOM.render(<Presenter />, rootNode);
}
