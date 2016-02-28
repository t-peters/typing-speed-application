
class User < ActiveRecord::Base
  has_many :results, dependent: :destroy
end