class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create #creates game and sends lyric length back to front end to populate tr's/li's on their end
        artist = Artist.find(params[:artist_id])
        song = artist.songs.sample
        new_game = Game.create(song_id: song.id)
        lyrics = song.lyric.length
        render json: {lyric_length: lyrics}
    end
end
