class AddWeatherToDays < ActiveRecord::Migration[6.0]
  def change
    add_column :days, :weather, :integer
  end
end
