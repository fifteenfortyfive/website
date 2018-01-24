get "/" do |env|
  render "src/views/index.slang", "src/views/_layout.slang"
end
