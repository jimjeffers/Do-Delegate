class CreateTodos < ActiveRecord::Migration
  def self.up
    create_table :todos do |t|
      t.string :name
      t.string :aasm_state
      t.references :user
      t.references :project
      t.timestamps
    end
    add_index :todos, :user_id
    add_index :todos, :project_id
  end

  def self.down
    remove_index :todos, :project_id
    remove_index :todos, :user_id
    mind
    drop_table :todos
  end
end
