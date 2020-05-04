class SongsController < ApplicationController
    def show
        song = Song.find(params[:id])
        render json: song
    end
end
