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
        decrypted_game_id = Game.decrypt(params[:game_id]);            
        song = Game.find(decrypted_game_id).song        
        if (game.completion) 
            render json: {error: "You trying to cheat?"}
        else      
            word = song.lyric.split(" ")[params[:hintNumber]]
            render json: {hint: Game.generate_hint(word)}
        end
    end
    

    def finish        
        decrypted_game_id = Game.decrypt(params[:game_id]);    
        game = Game.find(decrypted_game_id)
        game.update(completion:true)
        
        lyrics = game.song.lyric
        # this is the place that we will close the game
        render json: {artist: game.song.artist.name, song_title: game.song.title, lyrics: lyrics, total_score: game.total, time: game.time}
    end

    


    def create #creates game and sends lyric length back to front end to populate tr's/li's on their end
        artist = Artist.find(params[:artist_id])
        song = artist.songs.sample
        new_game = Game.create(song_id: song.id, total: 0) #need to set game_id in session
        encoded = Game.encrypt(new_game.id.to_s)
       
        lyrics =  new_game.lower_case_lyrics.length      
        render json: {lyric_length: lyrics, game_id: encoded}
    end

    def guess #this is an update CRUD action, but it is more secure to leave out the id frmo the route
        decrypted_game_id = Game.decrypt(params[:game_id]);        
        game = Game.find(decrypted_game_id)  
        if (game.completion) 
            render json: {error: "You trying to cheat?"}
        else            
            guess = Guess.new(word: params[:guess], game_id: game.id)
            if guess.save
                return_object = game.find_guesses(params[:guess]) #should return array of indices
                return_object[:score] = game.update_score(return_object[:indices].length) # this is convoluted - refactor if time
                render json: return_object
            else
                render json: {error: "You already guessed #{params[:guess]}"}
            end
        end
    end
end
