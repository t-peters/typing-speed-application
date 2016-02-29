get '/' do
  haml :index
end

post '/registration' do
  unless request.accept? 'application/json'
    { response: 'invalid parameters' }.to_json
  end

  data = JSON.parse request.body.string

  user = User.new
  user.username = data['username']
  user.email = data['email']
  user.password = data['password']

  if user.save
    { response: 'new user saved sucesful' }.to_json
  else
    { response: 'saving failed' }.to_json
  end
end

post '/login' do
  unless request.accept? 'application/json'
    { response: 'invalid parameters' }.to_json
  end
  data = JSON.parse request.body.string

  user = User.where(email: data['email'], password: data['password'])

  if user.empty?
    { code: 'error', response: 'User not registered or \
      password combination failed' }.to_json
  end

  unless user.empty?
    { code: 'success', response: 'Login Successful', user: user[0] }.to_json
  end
end

post '/save/result' do
  unless request.accept? 'application/json'
    { response: 'invalid parameters' }.to_json
  end
  data = JSON.parse request.body.string
  data.to_json
end
