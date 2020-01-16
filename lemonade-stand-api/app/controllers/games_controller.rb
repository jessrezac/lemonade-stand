class GamesController < ApplicationController
  def index
    games = Game.all
    GameSerializer.new(games)
  end

  def new
  end

  def create
    game = Game.create
    render json: GameSerializer.new(game)
  end

end
