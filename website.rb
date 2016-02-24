require 'rubygems'
require 'sinatra'
require 'haml'
require 'open-uri'
require 'oauth'
require 'json'
# require 'rubygems'


# Exchange your oauth_token and oauth_token_secret for an AccessToken instance.
def prepare_access_token(oauth_token, oauth_token_secret)
    consumer = OAuth::Consumer.new("2Eok3nm3tVCvUTfn8F5uoDOsr", "7JG0GMswvE6A6sjGWU0LZZF6dLlYgUktKq6a88FasFkGLrX4qL", { :site => "https://api.twitter.com", :scheme => :header })
     
    # now create the access token object from passed values
    token_hash = { :oauth_token => oauth_token, :oauth_token_secret => oauth_token_secret }
    access_token = OAuth::AccessToken.from_hash(consumer, token_hash )
 
    return access_token
end
 
# Exchange our oauth_token and oauth_token secret for the AccessToken instance.
access_token = prepare_access_token("3246896507-R9SrLeLIR1rrxmtbQb2H5csMikzOxjkDnmSDu1l", "0PgxnJYvQckmNaW9rm5mX0KAezCUzKbZddWieGczcRFM1")
 
# use the access token as an agent to get the home timeline
response = access_token.request(:get, "https://api.twitter.com/1.1/statuses/home_timeline.json")

# response.each do |x,y|
#   puts "#{x}: #{y}"
# end

result = JSON.parse(response.body)


get '/' do
  haml :index
end

get '/about' do
  haml :about
end