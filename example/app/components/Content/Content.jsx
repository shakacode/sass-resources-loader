import React from 'react';

import css from './Content.scss';

export default class Content extends React.PureComponent {
  render() {
    return (
      <section className={css.content}>
        Yabadabadoo!
      </section>
    );
  }
}
