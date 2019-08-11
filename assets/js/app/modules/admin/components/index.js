import { h, Component } from 'preact';
import { Link } from 'preact-router';

import {Routes} from '../../../constants';

const IndexPage = () => {
  return (
    <div class="container">
      <section class="section">
        <h1 class="title">Admin</h1>

        <ul>
          <li><Link href={Routes.ADMIN_EVENT}>Main Event</Link></li>
        </ul>
      </section>
    </div>
  );
};

export default IndexPage;
