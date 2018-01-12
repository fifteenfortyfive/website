require 'sinatra'
require 'haml'
require 'sass'
require 'yaml'

get '/signup' do
  haml :signup, layout: :_layout
end

get '/' do
  haml :index, layout: :_layout
end

get '/captains' do
  haml :captains, layout: :_layout
end

get '/results' do
  haml :results, layout: :_layout
end

get '/rules' do
  haml :rules, layout: :_layout
end

get '/schedule' do
  haml :schedule, layout: :_layout
end

get '/teams' do
  haml :teams, layout: :_layout
end
