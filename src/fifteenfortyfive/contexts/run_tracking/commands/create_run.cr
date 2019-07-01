require "auto_initialize"

module RunTracking::Commands
  struct CreateRun < BaseCommand
    include AutoInitialize

    property run_id : RunID
    property est_seconds : Int64

    def self.from_params(params, user)
      run_id = params["run_id"].as_s
      est_seconds = params["est_seconds"].as_i64

      new(run_id, est_seconds)
    end
  end
end
