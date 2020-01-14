class ChangeCostOfLemonadeToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :current_assets, :float
    change_column :days, :eod_assets, :float
  end
end
