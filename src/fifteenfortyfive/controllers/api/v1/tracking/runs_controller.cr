require "../../../../../fifteenfortyfive/contexts/run_tracking.cr"

class API::Tracking::RunsController < AppController
  def index
    runs = RunTracking.list_runs
    render_json({
      runs: runs
    })
  end

  def show
    if run = RunTracking.get_run(url_params["run_id"])
      render_json({
        run: run
      })
    end
  end


  ###
  # Commands
  ###

  # def create
  #   run_id = Random::Secure.urlsafe_base64(8)
  #   params = structured_params(Params::CreateRoom)
  #   name = params.name || "Room ##{run_id}"
  #   seed = params.seed || Random.rand(Int32::MAX)

  #   if run = RunTracking.create_run(run_id, name, seed, @context.current_user)
  #     render_json({
  #       run: run
  #     })
  #   else
  #     render_error_json(422, "Could not create run")
  #   end
  # end

  def join
    run_command(url_params["run_id"]) do |run|
      Rooms::Commands::JoinRoom.from_params(json_params, @context.current_user)
    end
  end


  private def run_command(run_id)
    if run = RunTracking.get_run(run_id)
      command = yield run
      command = set_meta(command)
      RunTracking.process_and_save(run, command)
      render_json({
        data: :accepted
      })
    else
      render_error_json(404, "Room does not exist")
    end
  end

  private def set_meta(command)
    command.with_meta(
      user_id: @context.current_user.id
    )
  end
end
