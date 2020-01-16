class ChangeEodAssetsToProfits < ActiveRecord::Migration[6.0]
  def change
    remove_column :days, :eod_assets, :float
    add_column :days, :profits, :float
  end
end
