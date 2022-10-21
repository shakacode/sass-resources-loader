import React from 'react';

import css from './Hero.scss';

export default class Hero extends React.PureComponent {
  render() {
    return (
      <section className={css.hero}>
        <h1>Hello, world!</h1>
      </section>
    );
  }
}
