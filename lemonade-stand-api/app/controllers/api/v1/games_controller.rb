class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: [:update, :delete]
  
  def index
    games = Game.all
    render json: GameSerializer.new(games).serialized_json
  end

  def create
    game = Game.create(game_params)
    game.days.create(day_params)
    render json: GameSerializer.new(game)
  end

  def update
    @game.days.create(day_params)
    render json: GameSerializer.new(@game)
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:id, :complete, days_attributes: [ :number, :cost_of_lemonade, :glasses_made, :cost_of_signs, :signs_made, :charge_per_glass, :glasses_sold, :game_id, :weather ])
  end 

  def day_params
    params.require(:days_attributes).permit(:number, :cost_of_lemonade, :glasses_made, :cost_of_signs, :signs_made, :charge_per_glass, :glasses_sold, :game_id, :weather, game: [:id, :complete])
  end

  
end
