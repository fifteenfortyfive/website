require "../contexts/accounts.cr"
require "./errors.cr"

class AppController
  include Orion::ControllerHelper

  TEMPLATE_DIR = File.join(__DIR__, "..", "templates")
  @@cached_templates = {} of String => String

  def redirect_to(location, status : Int32 = 302)
    response.headers.add "Location", location
    response.status_code = status
  end

  def render(template, path : String = TEMPLATE_DIR, status : Int32 = 200)
    file_path = File.real_path(File.join(path, template))

    unless template_content = @@cached_templates[file_path]?
      template_content = File.read(file_path)
      @@cached_templates[file_path] = template_content
    end

    response.status_code = status
    response.print(template_content)
  end

  def render_error(status : Int32, message : String)
    response.status_code = status
    response.print(message)
  end

  def render_json(content : String, status : Int32 = 200)
    response.status_code = status
    response.headers["Content-Type"] = "application/json"
    response.print(content)
  end

  def render_json(content, status : Int32 = 200)
    render_json(content.to_json, status)
  end

  def render_error_json(error : Errors::Error)
    render_json(error, error.status)
  end

  property! body_params : Hash(String, String)
  property! url_params : Hash(String, String)
  property! query_params : Hash(String, String)
  property! body_content : String

  def body_params
    @body_params ||= HTTP::Params.parse(body_content).to_h
  end

  def json_params
    @json_params ||= JSON.parse(body_content)
  end

  def url_params
    @url_params ||= request.path_params.to_h
  end

  def query_params
    @query_params ||= request.query_params.to_h
  end

  def structured_params(structure)
    body = body_content
    unless body.empty?
      structure.from_json(body)
    else
      structure.from_json("{}")
    end
  end

  def body_content
    @body_content ||= request.body.not_nil!.gets_to_end
  end

  protected def sign_in_user(account : Accounts::Account)
    session = Accounts.create_session(account)
    response.cookies["1545_session_id"] = session.id.not_nil!
    session
  end
end
