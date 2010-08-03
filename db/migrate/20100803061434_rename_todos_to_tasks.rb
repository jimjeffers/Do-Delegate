class RenameTodosToTasks < ActiveRecord::Migration
  def self.up
    rename_table :todos, :tasks
  end

  def self.down
    rename_table :tasks, :todos
  end
end
