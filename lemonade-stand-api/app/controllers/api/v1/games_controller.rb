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
    game = Game.create(game_params)
    game.days.build(day_params)
    options = {
      include: [:days]
    }
    render json: GameSerializer.new(game, options)
  end

  private

  def game_params
    params.require(:game).permit(:id, :complete, days_attributes: [ :number, :cost_of_lemonade, :glasses_made, :cost_of_signs, :signs_made, :charge_per_glass, :glasses_sold, :game_id, :weather ])
  end 

  def day_params
    params.require(:days_attributes).permit(:number, :cost_of_lemonade, :glasses_made, :cost_of_signs, :signs_made, :charge_per_glass, :glasses_sold, :game_id, :weather, game: [:id, :complete])
  end

  
end
