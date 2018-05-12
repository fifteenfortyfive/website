.container
  .row
    .col-sm-8.col-sm-push-1
      .page-header
        h1 Edit Your Runs

      p These are the runs you are scheduled for in this year's 1545. Keeping your estimates up to date helps your team captain schedule runs, and gives everyone a better idea of what to expect during the event.


      form.run-editor
        - runs.each do |run|
          .run(data-run-id="#{run.id}")
            span.run__game= run.game.name
            .form__field
              label.form__label.form__label--large PB
              input.form__input(type="text" name="pb" value=run.pb placeholder="hh:mm:ss")

            .form__field
              label.form__label.form__label--large EST
              input.form__input(type="text" name="est" value=run.estimate placeholder="hh:mm:ss")

        .form-actions
          span.form__submit Save
          .flash-container

javascript:
  const FLASH_CONTAINER = document.querySelector(".flash-container");
  const EDITOR          = document.querySelector(".run-editor");
  const SUBMIT_BUTTON   = EDITOR.querySelector(".form__submit");

  function flash(kind, message) {
    let flash_element = document.createElement('div');
    flash_element.classList.add('flash-message');
    flash_element.classList.add('--' + kind);
    flash_element.innerText = message;

    FLASH_CONTAINER.appendChild(flash_element);

    setTimeout(function() {
      flash_element.remove();
    }, 3000);
  }

  SUBMIT_BUTTON.addEventListener('click', function(evt) {
    let runs_data = {};

    EDITOR.querySelectorAll('.run').forEach(function(run) {
      runs_data[run.getAttribute('data-run-id')] = {
        pb: run.querySelector('[name="pb"]').value,
        est: run.querySelector('[name="est"]').value
      }
    });

    fetch('/runs/update', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(runs_data),
      headers: new Headers({
        "Content-Type": 'application/json'
      })
    }).catch(function(error) { flash("error", "Couldn't connect to server."); })
    .then(function(response) {
      if(!response.ok) {
        flash("error", "Failed to save updates.");
      } else {
        flash("success", "Successfully saved updates.");
      }
    });
  });
