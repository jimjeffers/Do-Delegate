class ImplementCategoriesForTasks < ActiveRecord::Migration
  def self.up
    remove_index    :tasks, :project_id
    remove_column   :tasks, :project_id
    remove_index    :tasks, :user_id
    remove_column   :tasks, :user_id
    add_column      :tasks, :category_id, :integer
    add_index       :tasks, :category_id
  end

  def self.down
    remove_index    :tasks, :category_id
    remove_column   :tasks, :category_id
    add_column      :tasks, :user_id, :integer
    add_index       :tasks, :user_id
    add_column      :tasks, :project_id, :integer
    add_index       :tasks, :project_id
  end
end
