import { h } from 'preact';

import Layout from '../modules/layout/components/Layout';
import Anchor from '../uikit/Anchor';

import { Content } from 'bloomer';

const Volunteer = props => {
  return (
    <Layout>
      <Content>
        <h1 class="title">1545 Staff Volunteering</h1>

        <p>
          As the 1545 continues to grow and expand into more events throughout the year, we're looking to add
          staff members that can help us build and maintain a high quality organization for running them.
          Below we've listed a few positions that we are specifically looking to fill. If you're interested in
          getting involved with the production of The 1545 or any new events we'll be planning in the future,
          check them out and hit us up either on Discord (by messaging an Organizer), or by email at{' '}
          <Anchor href="mailto:volunteer@fifteenfortyfive.org">volunteer@fifteenfortyfive.org</Anchor>! If you
          have other suggestions for positions that you'd like to fill, or any other feedback, feel free to
          talk to us about it!
        </p>

        <h2>Marketing</h2>

        <p>
          The 1545 is first and foremost a convener, adept at cultivating a strong community of speedrunners
          with expertise in their games and a wish to help their fellow runners by extending that knowledge to
          their peers. We are looking for somebody who can help us develop content to provide maximum reach,
          impact and value to the entire speedrunning community through our Twitter page, Discord
          announcements, and other social platforms.
        </p>

        <h2>Runner Management</h2>

        <p>
          The Runner Management position is in charge of the runners and commentators that are involved with
          the various events put on by The 1545. As a manager, your job is to coordinate runners and
          commentators, make sure they’ve got everything set and ready to go for each event, and be willing to
          go the extra mile and find replacements in case somebody drops. Timely communication with the
          organizers is a must. If you have good leadership and decision-making skills, this position is for
          you!
        </p>

        <h2>Scheduling</h2>

        <p>
          With the addition of several new events to look forward to, quick scheduling becomes more and more
          essential within the 1545 community. As a scheduler, you will work with the rest of the 1545 staff
          in order to correctly balance teams and runners for each event, as well as with runner management to
          make sure everyone can be available when needed. For larger events, this may also include scheduling
          shifts for staff to make sure positions are always covered. If you love logistics, this is for you!
        </p>

        <h2>Stream Tech</h2>

        <p>
          With the unique premise of The 1545 come unique challenges in presentation on stream. To deal with
          this, we've developed custom tools to run and manage our streams. Now, as we grow into other events,
          we'll also be including more traditional stream management into our flow. As a stream tech, you are
          responsible for actively managing the stream content by working with dashboards, directly with OBS,
          and debugging problems as they arise. You will also be interacting with runner managers, organizers,
          and runners/commentators directly to help solve technical issues and make sure the live presentation
          of our events can run smoothly.
        </p>

        <p>
          This position also includes possibilities for working on developing new tools and stream layouts for
          various events, though this is not a requirement of the position.
        </p>

        <h2>Graphic Design / Art</h2>

        <p>
          As we transition from The 1545 into a new, more general organization, we'll be looking to establish
          a solid foundation for design and branding that we can use across all of our events, as well as
          unique flairs for each one to make them stand out on their own. If you like making things that look
          great, this is the position for you!
        </p>

        <p>
          We're looking for graphic designers that have a knack for layout and motion graphics to help make
          some of the best stream presentations out there. We're also looking for artists to create
          illustrations, animations, and other assets to give each event, team, and the organization as a
          whole its own personality.
        </p>

        <h2>Moderation</h2>

        <p>
          The idea behind The 1545 is rather complex and not intuitive to many outside viewers. Someone coming
          into the stream for the first time is very likely to be confused by what’s happening. Even after
          some explanation, they likely won’t understand a lot of the different decisions that have been made
          to get to where we are now. As a moderator, you will be responsible for informing the general
          community as to why certain decisions have been made regarding games, categories, runners, etc. per
          event. Moderators also help mitigate any conflicts that come up in chat, either on Twitch or
          Discord, and keep the environment friendly and welcoming for everyone.
        </p>

        <p>
          Moderators make themselves available on event days, with variable on hours depending on said event,
          and are generally an active member of the community.
        </p>
      </Content>
    </Layout>
  );
};

export default Volunteer;
