class Game < ApplicationRecord
  belongs_to :song

  @@key = '1a3856t83e01b171' #this needs to change for production
  @@iv = '1s3b5bu83602s11t'

  def self.generate_hint(word)
    if word.length < 3
      hint = "It's a small word."
    else
      i = 1
      hint = word[0]
      until i == (word.length - 1) do
          hint += "*"
          i += 1
      end
      hint += word[-1]
    end
  end

  def self.find_next_hint(guess_array) #don't need to use unless we're using sessions to transfer that data
    i = 0
    until guess_array[i] != i do
        i += 1
    end
    return Game.find(session[:game_id]).song.lyrics.split(" ")[i]
  end

  def self.encrypt(plain_data)
    cipher = OpenSSL::Cipher::AES.new(128, :CBC).encrypt
    cipher.key = @@key
    cipher.iv = @@iv

    encrypted = cipher.update(plain_data) + cipher.final
  end

  def self.decrypt(encrypted_data)
    decipher = OpenSSL::Cipher::AES.new(128, :CBC)
    decipher.decrypt
    decipher.key = @@key
    decipher.iv = @@iv

    plain = decipher.update(encrypted_data) + decipher.final
  end

end
