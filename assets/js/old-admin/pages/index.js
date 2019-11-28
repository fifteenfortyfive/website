import { h, Component } from 'preact';
import { Link } from 'preact-router';

const IndexPage = () => {
  return (
    <div class="container">
      <section class="section">
        <h1 class="title">Admin V2</h1>

        <ul>
          <li>
            <Link href="/events/16/submissions">Submissions</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default IndexPage;
