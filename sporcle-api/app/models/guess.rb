class Guess < ApplicationRecord
  belongs_to :game
  validates :word, uniqueness: { scope: :game_id}
end
