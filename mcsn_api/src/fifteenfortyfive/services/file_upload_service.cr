require "awscr-s3"

require "./twitch_service.cr"

module FileUploadService
  extend self

  # The maximum file size that the service will accept.
  # This is entirely client-defined and arbitrary.
  MAX_FILE_SIZE = (2 * 1024 * 1024).to_u64 # 2MB

  ACCEPTABLE_IMAGE_TYPES = ["image/jpeg", "image/png"]

  STORAGE        = Constants::STORAGE_CLIENT
  UPLOADER       = Awscr::S3::FileUploader.new(STORAGE)
  DEFAULT_BUCKET = Constants::DEFAULT_ASSET_BUCKET

  UPLOAD_OPTS = {
    # Avatar files need to be public for clients to load them easily.
    "x-amz-acl" => "public-read",
  }

  class UploadException < Exception; end

  class FileTooLarge < UploadException
    def initialize(@given_size : UInt64, @max_size : UInt64); end
  end

  # Uploads the given file to the storage provider and return the object hash
  # assigned to it.
  def upload_image(file : File, *, bucket : String = DEFAULT_BUCKET) : String
    object_id = UUID.random.to_s

    if file.size > MAX_FILE_SIZE
      raise FileTooLarge.new(file.size, MAX_FILE_SIZE)
    end

    UPLOADER.upload(bucket, object_id, file, UPLOAD_OPTS)

    return object_id
  end

  # Validates that the given form part _should_ contain an image that is
  # acceptable by this service, then copies the image data into a new Tempfile
  # buffer to return to the caller.
  #
  # Returns nil if the data is invalid in any way.
  def extract_image_from_multipart(part : HTTP::FormData::Part) : File?
    if _content_type_is_image(part.headers["Content-Type"])
      tempfile = File.tempfile("avatar_upload") do |file|
        IO.copy(part.body, file)
      end
      avatar_file = File.open(tempfile.path)

      if File.size(avatar_file.path) > MAX_FILE_SIZE
        return nil
      end

      return avatar_file
    end

    return nil
  end

  private def _content_type_is_image(content_type : String)
    ACCEPTABLE_IMAGE_TYPES.includes?(content_type)
  end
end
