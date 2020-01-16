class Api::V1::GamesController < ApplicationController
  def index
    games = Game.all
    options = {
      include: [:days]
    }
    render json: GameSerializer.new(games, options).serialized_json
  end

  def new
  end

  def create
    game = Game.create
    options = {
      include: [:days]
    }
    render json: GameSerializer.new(game, options)
  end

end
