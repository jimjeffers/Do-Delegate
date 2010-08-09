class AddFocusToTask < ActiveRecord::Migration
  def self.up
    add_column :tasks, :focus, :integer, :default => 0
    add_index :tasks, :focus
  end

  def self.down
    remove_index :tasks, :focus
    remove_column :tasks, :focus
  end
end
