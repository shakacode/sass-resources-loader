import React from 'react';

import css from './Content.scss';

export default class Content extends React.Component {

  render() {
    return (
      <section className={css.content}>
        Yabadabadoo!
      </section>
    );
  }

}
