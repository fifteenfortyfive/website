module Errors
  struct Error
    property message : String
    property status : Int32

    def initialize(@message : String, @status : Int32)
    end

    def to_json(str)
      str << JSON.build do |json|
        json.object do
          json.field "message", message
        end
      end
    end
  end

  BadRequest          = Error.new("bad request", 400)
  Unauthorized        = Error.new("unauthorized", 401)
  Forbidden           = Error.new("forbidden", 403)
  NotFound            = Error.new("not found", 404)
  Conflict            = Error.new("conflict", 409)
  InternalServerError = Error.new("internal server error", 500)
  Unprocessable       = Error.new("unprocessable entity", 422)
end
