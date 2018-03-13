.container
  .row
    .col-sm-6.col-sm-push-2

      .account-box
        - if account.avatar_object_id
          img.account-box__avatar(src="#{Constants::ASSETS_URL}/#{account.avatar_object_id}")
        - else
          img.account-box__avatar

        .account-box__info
          span.account-box__username== account.username

          - if (twitch_name = account.twitch) && !twitch_name.empty?
            .account-box__social
              span.account-box__social__brand.fab.fa-twitch
              span.account-box__social__value= twitch_name

          - if (twitter_name = account.twitter) && !twitter_name.empty?
            .account-box__social
              span.account-box__social__brand.fab.fa-twitter
              span.account-box__social__value= twitter_name
