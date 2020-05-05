class Game < ApplicationRecord
  belongs_to :song

  def self.generate_hint(word)
    if word.length < 4
      hint = "It's a small word."
    else
      i = 1
      hint = word[0]
      until i == (word.length - 2) do
          hint += "*"
          i += 1
      end
      hint += word[-1]
    end
  end

  def self.find_next_hint(guess_array)
    i = 0
    until session[:guesses][i] != i do
        i += 1
    end
    return Game.find(session[:game_id]).song.lyrics.split(" ")[i]
  end

end
