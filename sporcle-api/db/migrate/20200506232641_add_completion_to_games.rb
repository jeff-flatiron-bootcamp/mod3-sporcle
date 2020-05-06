class AddCompletionToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :completion, :boolean, default: false
  end
end
