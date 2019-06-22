module Errors
  struct Error
    property message : String
    property status : Int32

    def initialize(@message : String, @status : Int32)
    end

    def to_json(json)
      json.object do
        json.field "message", message
      end
    end
  end

  Forbidden = Error.new("forbidden", 401)
  Unauthorized = Error.new("unauthorized", 403)
  NotFound = Error.new("not found", 404)
  InternalServerError = Error.new("internal server error", 500)
  InvalidInput = Error.new("invalid input", 422)
end
