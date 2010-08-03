class Task < ActiveRecord::Base
  
  # --------------------------------------------------------------
  # Relationships
  #
  # A Task belongs to a user and a project.
  # It can also be bound to a user via a join
  # model known as a deligation. The deligation model
  # tracks a deligator and a deligatee. This is 
  # used primarily to handle deligation of Tasks
  # from one user to another.
  
  belongs_to :user
  has_many :delegations
  
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
  
  # --------------------------------------------------------------
  # Class Methods
  
  # --------------------------------------------------------------
  # Instance Methods
  
end
