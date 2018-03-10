.container
  .row
    .col-sm-10
      .page-header
        .pull-right
          .form__button.save-button
            | Save

        h1 Teams Editor



  .row
    .col-sm-4
      input.runs-filter(placeholder="Search runs...")
      .runs-list.team-editor-container
        .run.run--template
          span.run__game-name
          span.run__runner-name
          span.run__runner-id
          span.run__times
            span.run__pb
            span.run__estimate

    .col-sm-6
      .teams-list.team-editor-container
        .team.team--template
          input.team__id(type="hidden")
          span.team__remove-button
            .fas.fa-times
          input.team__name(placeholder="Team name")
          input.team__color(placeholder="color")
          .team__runs

      .form__button.add-team-button
        | Add new Team


javascript:
  var available_runs = #{available_runs_json};
  var existing_teams = #{existing_teams_json};

script(src="/js/dragula.js")
script(src="/js/team-editor.js")
