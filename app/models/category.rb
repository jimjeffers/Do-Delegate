class Category < ActiveRecord::Base
  
  # --------------------------------------------------------------
  # Relationships
  #
  # A Category belongs to a user and has many tasks. This object
  # serves as the connection between the user and the task models.
  
  belongs_to :user
  has_many :tasks
  
  # --------------------------------------------------------------
  # Validations
  #
  # In order to be valid, a Category, at the very least,
  # must have a name and belong to a user.
  
  validates_presence_of :name, :user
  
  # --------------------------------------------------------------
  # States and Transitions
  
  # --------------------------------------------------------------
  # Scopes
  
  # --------------------------------------------------------------
  # Callbacks
  
  # --------------------------------------------------------------
  # Class Methods
  
  # --------------------------------------------------------------
  # Instance Methods
  
  # update_task_counts!
  # Updates the count of incomplete tasks and incomplete tasks 
  # with focus.
  def update_task_counts!
    self.update_attributes({:focus_count  => self.tasks.incomplete.focused.count,
                            :task_count   => self.tasks.incomplete.count})
  end
  
end
