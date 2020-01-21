require "../../contexts/events"

class API::ErrorsController < AppController
  def not_found
    render_error_json(Errors::NotFound)
  end
end
