class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.integer :number
      t.integer :cost_of_lemonade
      t.integer :glasses_made
      t.integer :cost_of_signs
      t.integer :signs_made
      t.integer :charge_per_glass
      t.integer :glasses_sold
      t.integer :eod_assets
      t.integer :game_id

      t.timestamps
    end
  end
end
