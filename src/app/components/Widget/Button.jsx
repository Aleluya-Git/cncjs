import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Anchor from '../Anchor';
import styles from './index.styl';

class Button extends Component {
  static propTypes = {
    ...Anchor.propTypes,
    inverted: PropTypes.bool
  };

  static defaultProps = {
    ...Anchor.defaultProps,
    inverted: false
  };

  render() {
    const { inverted, className, ...props } = this.props;

    return (
      <Anchor
        {...props}
        className={cx(className, styles.widgetButton, {
          [styles.disabled]: !!props.disabled,
          [styles.inverted]: inverted
        })}
      />
    );
  }
}

export default Button;
