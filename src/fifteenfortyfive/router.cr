require "http"
require "orion"

require "./controllers/**"
require "./handlers/authentication_handler"
require "./handlers/authorization_handler"
require "./handlers/cors_handler"
require "./handlers/session_handler"

router AppRouter do
  use HTTP::ErrorHandler
  use HTTP::LogHandler.new(STDOUT)
  # use AnalyticsHandler
  use SessionHandler

  concern :api_authenticated do
    use AuthenticationHandler
  end

  concern :api_admin_authorized do
    implements :api_authenticated
    use AuthorizationHandler.new(required_level: :admin)
  end

  scope "admin", helper_prefix: "admin" do
    implements :api_admin_authorized

    scope "v2" do
      match "*", to: "admin::V2::App#index"
    end

    match "*", to: "static#app_root"
  end

  scope "api" do
    scope "v1" do
      use CORSHandler.new("/api/v1")

      scope "events" do
        get "/", to: "aPI::Events#index"

        scope ":event_id" do
          get "/", to: "aPI::Events#get"
          get "/allowed-runs", to: "aPI::Events#allowed_runs"

          scope "submission" do
            implements :api_authenticated

            get "/", to: "aPI::SubmissionMeta#get"
            post "/", to: "aPI::SubmissionMeta#create"
            post "/update", to: "aPI::SubmissionMeta#update"
            post "/revoke", to: "aPI::SubmissionMeta#revoke"
            post "/unrevoke", to: "aPI::SubmissionMeta#unrevoke"
            post "/delete", to: "aPI::SubmissionMeta#delete"

            get "/runs", to: "aPI::SubmissionMeta#runs_index"
            post "/runs", to: "aPI::SubmissionMeta#runs_create"
            post "/runs/:run_id", to: "aPI::SubmissionMeta#runs_update"
            post "/runs/:run_id/delete", to: "aPI::SubmissionMeta#runs_delete"
          end

          scope do
            implements :api_admin_authorized

            post "/start", to: "aPI::Events#start"
            post "/finish", to: "aPI::Events#finish"
            post "/resume", to: "aPI::Events#resume"
            post "/reset", to: "aPI::Events#reset"
          end

          scope "teams" do
            get "/", to: "aPI::Teams#index"

            scope "/:team_id" do
              get "/", to: "aPI::Teams#get"

              implements :api_admin_authorized

              post "/start", to: "aPI::Teams#start"
              post "/finish", to: "aPI::Teams#finish"
              post "/resume", to: "aPI::Teams#resume"
              post "/reset", to: "aPI::Teams#reset"
            end
          end

          scope "submissions" do
            get "/", to: "aPI::Submissions#index"
            get "/:submission_id", to: "aPI::Submissions#get"
          end

          scope "runs" do
            get "/", to: "aPI::Runs#index"
            get "/:run_id", to: "aPI::Runs#get"

            implements :api_authenticated

            post "/:run_id/start", to: "aPI::Runs#start"
            post "/:run_id/finish", to: "aPI::Runs#finish"
            post "/:run_id/resume", to: "aPI::Runs#resume"
            post "/:run_id/reset", to: "aPI::Runs#reset"
          end
        end
      end

      scope "schedules" do
        get "/:schedule_id", to: "aPI::Schedules#get"
        post "/", to: "aPI::Schedules#create"

        post "/:schedule_id/add-activity", to: "aPI::Schedules#add_activity"
        post "/:schedule_id/remove-activity", to: "aPI::Schedules#remove_activity"
      end

      scope "accounts" do
        get "/", to: "aPI::Accounts#index"
        get "/:account_id", to: "aPI::Accounts#get"

        post "/create", to: "aPI::Accounts#create"
      end

      scope "sessions" do
        post "/", to: "aPI::Sessions#login"
        post "/delete", to: "aPI::Sessions#logout"
      end

      scope "games" do
        get "/", to: "aPI::Games#index"
        get "/:game_id", to: "aPI::Games#get"
      end

      scope "runs" do
        get "/", to: "aPI::Runs#index"
        get "/:run_id", to: "aPI::Runs#get"
      end

      scope "teams" do
        get "/", to: "aPI::Teams#index"
        get "/:team_id", to: "aPI::Teams#get"
      end

      scope "streams" do
        get "/", to: "aPI::Streams#index"
        get "/:account_id", to: "aPI::Streams#get"
      end

      scope "@me" do
        implements :api_authenticated

        get "/", to: "API::MeController#get"
        post "/", to: "API::MeController#update_account"

        post "/avatar", to: "API::MeController#update_avatar"

        scope "account_preferences" do
          get "/", to: "aPI::AccountPreferences#get"
          post "/", to: "aPI::AccountPreferences#update"
        end
      end

      scope "admin" do
        implements :api_admin_authorized

        scope "events" do
          scope ":event_id" do
            get "/scheduling", to: "API::Admin::SchedulingController#get"
          end
        end
      end
    end

    scope "live" do
      scope "push" do
        implements :api_admin_authorized
        use CORSHandler.new("/api/live/push")

        post "/action" do |conn|
          if body = conn.request.body
            SocketService.broadcast(body.gets_to_end)
          end

          conn.response.status_code = 200
          conn.response.puts({processed: true}.to_json)
          true
        end
      end

      scope "stream" do
        use HTTP::WebSocketHandler.new { |socket, conn|
          socket.on_message(&->SocketService.broadcast_to_admin(String))
          SocketService.add_stream(socket)
        }

        match "*" do |conn|
          true
        end
      end

      scope "admin" do
        implements :api_admin_authorized
        use HTTP::WebSocketHandler.new { |socket, conn| SocketService.add_stream_admin(socket) }

        match "*" do |conn|
          true
        end
      end
    end

    implements :api_authenticated

    scope "admin" do
      implements :api_admin_authorized
      scope "events" do
        get "/", to: "aPI::Admin#events"
        get "/:event_id/", to: "aPI::Admin#event"
      end

      scope "accounts" do
        get "/", to: "aPI::Admin#accounts"
      end

      scope "games" do
        get "/", to: "aPI::Admin#games"
      end
    end

    match "*", to: "aPI::Errors#not_found"
  end

  # # Static assets
  scope "css" do
    use HTTP::StaticFileHandler.new("public/", fallthrough: false, directory_listing: false)
  end
  scope "js" do
    use HTTP::StaticFileHandler.new("public/", fallthrough: false, directory_listing: false)
  end
  scope "images" do
    use HTTP::StaticFileHandler.new("public/", fallthrough: false, directory_listing: false)
  end

  match "*", to: "static#app_root"
end
