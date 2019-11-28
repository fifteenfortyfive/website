import { h } from 'preact';

const Container = props => {
  const { children } = props;

  return (
    <div class="container">
      <section class="section">{children}</section>
    </div>
  );
};

export default Container;
