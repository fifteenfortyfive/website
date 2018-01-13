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
    script(defer=true src="https://use.fontawesome.com/releases/v5.0.3/js/all.js")


  body
    nav.navbar.navbar-inverse.navbar-static-top
      .container
        .navbar-header
          button.navbar-toggle.collapsed(data-toggle="collapse" data-target="#navbar-collapse")
            span.icon-bar
            span.icon-bar
            span.icon-bar
          a.navbar-brand(href="/") The 1545

        .collapse.navbar-collapse#navbar-collapse
          ul.nav.navbar-nav
            li
              a(href="/teams") Teams
            li
              a(href="/results") Results
            li
              a(href="/rules") Rules

          ul.nav.navbar-nav.navbar-right
            li
              a(href="https://discord.gg/ZYfBpdk" target="_blank") Discord
            li
              a(href="https://twitch.tv/1545race" target="_blank") Twitch
            li
              a(href="https://twitter.com/1545race" target="_blank") Twitter

    == content
