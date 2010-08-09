class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string :name
      t.references :user
      t.timestamps
    end
    add_index :categories, :user_id
  end

  def self.down
    remove_index :categories, :user_id
    drop_table :categories
  end
end
