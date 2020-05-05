class GamesController < ApplicationController
    def index
        session[:init] = true
        # games = Game.all
        # render json: games
        puts session[:game_id]
        byebug
    end
    

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create #creates game and sends lyric length back to front end to populate tr's/li's on their end
        artist = Artist.find(params[:artist_id])
        song = artist.songs.sample
        new_game = Game.create(song_id: song.id) #need to set game_id in session

        # session[:init] = true
        session["game_id"] = new_game.id
        # session[:guesses] = [1, 2, 3, 4]
        
        lyrics = song.lyric.length
        render json: {lyric_length: lyrics, session: session}
    end

    def hint #session[:guesses] should be an array of indexes they have guessed
        word = Game.find_next_hint(session[:guesses]) #will probably need to do something to session[:guesses]
        render json: {hint: Game.generate_hint(word)}
    end
end
