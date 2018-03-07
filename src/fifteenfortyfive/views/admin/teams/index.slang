.container
  .row
    .col-sm-10
      .page-header
        h1 Teams Editor


  .row
    .col-sm-4
      .runs-list
        .run.run--template
          span.run__game-name
          span.run__runner-name
          span.run__runner-id
          br
          span.run__pb
          span.run__estimate

    .col-sm-6
      .teams-list
        .team.team--template
          span.team__id
          span.team__name
          span.team__color
          .team__runs

      .form__button.add-team-button
        | Add new Team


javascript:
  var runs = #{available_runs_json};

script(src="/js/team-editor.js")
