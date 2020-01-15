class ChangeDefaultValues < ActiveRecord::Migration[6.0]
  def change
    change_column_default :games, :current_assets, 2.0
    change_column_default :games, :complete, false
  end
end
