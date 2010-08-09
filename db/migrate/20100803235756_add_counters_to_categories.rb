class AddCountersToCategories < ActiveRecord::Migration
  def self.up
    add_column :categories, :focus_count, :integer, :default => 0, :length => 4
    add_column :categories, :task_count, :integer, :default => 0, :length => 4
    add_index :categories, :focus_count
    add_index :categories, :task_count
  end

  def self.down
    remove_index :categories, :task_count
    remove_index :categories, :focus_count
    remove_column :categories, :task_count
    remove_column :categories, :focus_count
  end
end
