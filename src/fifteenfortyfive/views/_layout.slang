doctype html
html
  head
    meta name="viewport" content="width=device-width, initial-scale=1"

    script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"
    script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    script src="https://use.typekit.net/abb5hmw.js"
    javascript:
      try{Typekit.load({ async: true });}catch(e){}

    link rel="stylesheet" href="/css/bootstrap.min.css"
    link rel="stylesheet" href="/css/main.css?"

    script src="/js/nanoajax.min.js"
    script(src="https://use.fontawesome.com/releases/v5.0.3/js/all.js")


  body
    nav.navbar.navbar-static-top
      .container
        p.navbar-text
          a.navbar-link.navbar-link--bright(href="/") Home

        - if env.feature_flags["signups"].enabled
          p.navbar-text
            a.navbar-link(href="/register") Register

          - if env.current_user? && env.current_user.admin
            p.navbar-text
              a.navbar-link(href="/admin/feature_flags") Admin

          .navbar-right
            ul.nav
              - if env.current_user?
                p.navbar-text
                  a.navbar-link(href="/accounts/edit")= env.current_user.username
                  | |
                  a.navbar-link(href="/signout") Sign out
              - else
                p.navbar-text
                  a.navbar-link(href="/signin") Sign in
                  | or
                  a.navbar-link(href="/accounts/new") Sign up



    == content

footer
  .container
    .row
      .col-sm-10
        .pull-right
          p
            == "&copy;"
            | 2018 fifteenfortyfive.org

        ul
          li
            a(href=Constants::DISCORD_URL target="_blank") Discord
          li
            a(href=Constants::TWITCH_URL target="_blank") Twitch
          li
            a(href=Constants::TWITTER_URL target="_blank") Twitter


