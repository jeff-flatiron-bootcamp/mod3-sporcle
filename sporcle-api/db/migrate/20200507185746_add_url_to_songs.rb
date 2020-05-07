class AddUrlToSongs < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :url, :string
  end
end
