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

  user = User.find_by(:email=>data['user'])
  result = Result.new
  
  # if !user.empty?
  #   # result.user = user
  #   # result.results = data['result']
  #   # result.datetime = Time.now
  #   if result.save
  #     {:code=>"success",:response=>"Result saved Successfully"}.to_json
  #   else
  #     {:code=>"error",:response=>"Result not saved"}.to_json
  #   end
  # else
  #   {:code=>"error",:response=>"User not found"}.to_json
  # end

end