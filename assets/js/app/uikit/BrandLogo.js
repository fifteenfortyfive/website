import {h} from 'preact';
import classNames from 'classnames';

import style from './BrandLogo.css';

const BrandLogo = (props) => {
  const {
    className
  } = props;

  return (
    <span class={classNames(style.brandLogo, className)}>The 1545</span>
  );
}

export default BrandLogo;
