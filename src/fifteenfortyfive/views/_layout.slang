doctype html
html
  head
    meta name="viewport" content="width=device-width, initial-scale=1"
    title The 1545

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
          a.hidden-xs.navbar-link.navbar-link--bright.navbar-title(href="/") The 1545
          a.visible-xs.navbar-link.navbar-link--bright(href="/")
            span.fas.fa-home

        - if env.feature_flags["teams"].enabled
          p.navbar-text
            a.navbar-link(href="/teams") Teams

        p.navbar-text
          a.navbar-link(href="/register") Register

        - if env.current_user? && env.current_user.admin
          p.navbar-text
            a.navbar-link(href="/admin") Admin

        .navbar-right
          ul.nav
            - if env.current_user?
              .navbar-dropdown
                .navbar-dropdown__display
                  - if env.current_user.avatar_object_id
                    img.avatar.avatar--navbar(src="#{Constants::ASSETS_URL}/#{env.current_user.avatar_object_id}")
                  - else
                    == env.current_user.username
                .navbar-dropdown__menu
                  span.navbar-dropdown__menu-item.--header
                    | Signed in as
                    strong== env.current_user.username
                  a.navbar-dropdown__menu-item(href="/accounts/edit") Edit Account
                  a.navbar-dropdown__menu-item(href="/signout") Sign out

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


javascript:
  var navbar_dropdown = document.querySelector('.navbar-dropdown');
  var dropdown_display = navbar_dropdown.querySelector('.navbar-dropdown__display');

  dropdown_display.addEventListener('click', function(evt) {
    if(navbar_dropdown.classList.contains('--open')) {
      navbar_dropdown.classList.remove('--open');
    } else {
      navbar_dropdown.classList.add('--open');
    }
  });
