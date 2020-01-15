class GamesController < ApplicationController
  def index
    @games = Game.all
    
  end

  def new
  end

  def create
    game = Game.create
    render json: 
  end

end
