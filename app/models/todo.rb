class Todo < ActiveRecord::Base
  
  # Handle state transitions.
  #
  # A Todo can be in one of two states:
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
  
  # End state management.
  
end
