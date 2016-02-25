class UsersTable < ActiveRecord::Migration
  
  def up
    create_table :users do |t|
      t.string :username
      t.string :email, :index => true 
      t.string :password
      t.string :access_token
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
