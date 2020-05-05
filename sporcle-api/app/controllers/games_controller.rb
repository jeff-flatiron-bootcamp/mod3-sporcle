class GamesController < ApplicationController
    def index
        session[:init] = true
        # games = Game.all
        # render json: games
        puts session[:game_id]
        byebug
    end

    def hint #session[:guesses] should be an array of indexes they have guessed
        # word = Game.find_next_hint(hintNumber) #will probably need to do something to session[:guesses]

        song = Game.find(params[:game_id]).song
        word = song.lyric.split(" ")[params[:hintNumber]]

        render json: {hint: Game.generate_hint(word)}
    end
    

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create #creates game and sends lyric length back to front end to populate tr's/li's on their end
        artist = Artist.find(params[:artist_id])
        song = artist.songs.sample
        new_game = Game.create(song_id: song.id, total: 0) #need to set game_id in session


        ## attempts at encryption through sessions and encoding

        # session[:init] = true
        # session["game_id"] = new_game.id
        # session[:guesses] = [1, 2, 3, 4]

        # encoded_id = Game.encrypt("message").encode("UTF-8", invalid: :replace) - may try to get this to work later
        # ec = Encoding::Converter.new("ASCII-8BIT", "UTF-8")
        # new_id = ec.convert(encoded_id)

        
        lyrics = song.lyric.length
        render json: {lyric_length: lyrics, game_id: new_game.id}
    end

    def guess #this is an update CRUD action, but it is more secure to leave out the id frmo the route
        game = Game.find(params[:game_id])
        #validate that guess has not already been registered - new guess table with game foreign id - need a function to check if that guess already exists

        return_object = game.find_guesses(params[:guess]) #should return array of indices
        return_object[:score] = game.update_score(return_object[:indices].length) # this is convoluted - refactor if time

        render json: return_object
    end

end
