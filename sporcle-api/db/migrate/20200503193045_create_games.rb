class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :correct
      t.integer :total
      t.integer :time
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
