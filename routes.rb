get '/' do
  haml :index
end

post '/registration' do
  return {:response => "invalid parameters"}.to_json if !request.accept? 'application/json'

  data = JSON.parse request.body.string


  user = User.new
  user.username = data['username']
  user.email = data['email']
  user.password = data['password']

  if user.save
    {:response => "new user saved sucesful"}.to_json
  else
    {:response => "saving failed"}.to_json
  end
end

post '/login' do
    return {:response => "invalid parameters"}.to_json if !request.accept? 'application/json'
    data = JSON.parse request.body.string

    user = User.where(:email=>data['email'],:password=>data['password'])

    if user.empty?
      {:code=>'error',:response => "User not registered or password combination failed"}.to_json
    end 

    {:code=>'success',:response => 'Login Successful',:user=>user[0]}.to_json if !user.empty?
end


post '/save/result' do 
  return {:response => "invalid parameters"}.to_json if !request.accept? 'application/json'
  data = JSON.parse request.body.string

  data.to_json

end