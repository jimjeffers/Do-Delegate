class Task < ActiveRecord::Base
  
  # --------------------------------------------------------------
  # Relationships
  #
  # A Task belongs to a category which inherently belongs to a 
  # user. It also may have a delegation which can bind a user to
  # a task directly. This is to handle the transfer or ownership
  # of a task from one user to the other.
  
  belongs_to :category
  has_one :delegation
  
  # --------------------------------------------------------------
  # Validations
  #
  # In order to be valid, a Task, at the very least,
  # must have a name.
  
  validates_presence_of :name
  
  # --------------------------------------------------------------
  # States and Transitions
  #
  # A Task can be in one of two states:
  # 1. incomplete
  # 2. complete

  include AASM
  aasm_initial_state :incomplete

  aasm_state :incomplete
  aasm_state :completed

  aasm_event :check do
    transitions :to => :completed, :from => [:incomplete]
  end

  aasm_event :uncheck do
    transitions :to => :incomplete, :from => [:completed]
  end
  
  # --------------------------------------------------------------
  # Scopes
  # NOTE: Be sure to include the table name in conditions to ensure
  # scopes will work when chained to relationships.
  
  # Only returns tasks that are presently in an incomplete state.
  named_scope :incomplete, 
    :conditions => ["tasks.aasm_state=?",'incomplete']
    
  # Listable returns any tasks that should be shown on a task list.
  # Current qualifications require that the task must either be incomplete
  # or updated recently.
  named_scope :listable, 
    :conditions => ["tasks.aasm_state=? OR tasks.updated_at > ?",'incomplete',12.hours.ago]
  
  # Focused only returns tasks that are set for the focus/today list.
  named_scope :focused, 
    :conditions => ["tasks.focus=?",1]
  
  # --------------------------------------------------------------
  # Callbacks 
  
  # After a task is created or saved we'll update the task counts
  # for its parent category.
  def after_save
    self.category.update_task_counts!
  end
  
  # --------------------------------------------------------------
  # Class Methods
  
  # --------------------------------------------------------------
  # Instance Methods
  
  # focus?
  # Returns the focus state of the current instance. The actual
  # value stored is an integer with a value of 0 or 1 signifying
  # true or false.
  def focus?
    (self.focus > 0) ? true : false
  end
  
  # add_focus
  # Sets the focus attribute to 1 to signify true.
  def add_focus
    self.update_attribute :focus, 1
  end
  
  # remove_focus
  # Sets the focus attribute to 0 to signify false.
  def remove_focus
    self.update_attribute :focus, 0
  end
  
end
