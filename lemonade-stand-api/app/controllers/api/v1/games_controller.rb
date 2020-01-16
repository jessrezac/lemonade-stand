class Api::V1::GamesController < ApplicationController
  def index
    games = Game.all
    render json: GameSerializer.new(games).serialized_json
  end

  def new
  end

  def create
    game = Game.create
    render json: GameSerializer.new(game)
  end

end
