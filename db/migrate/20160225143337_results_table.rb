class ResultsTable < ActiveRecord::Migration

  def up
    create_table :results do |x|
      x.belongs_to :user, :index => true
      x.string :results
      x.datetime :result_date
      x.timestamps
    end
  end

  def down
    drop_table :results
  end
end
