class GamesController < ApplicationController
  def index
    @games = Game.all
    
  end

  def new
  end

  def create
    game = Game.create()
    render json: SightingSerializer.new(game)
  end
end
