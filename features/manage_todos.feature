Feature: Manage todos
  In order to [goal]
  [stakeholder]
  wants [behaviour]
  
  Scenario: Register new todo
    Given I am on the new todo page
    When I fill in "Name" with "name 1"
    And I fill in "Aasm state" with "aasm_state 1"
    And I fill in "Project" with "project_id 1"
    And I fill in "User" with "user_id 1"
    And I press "Create"
    Then I should see "name 1"
    And I should see "aasm_state 1"
    And I should see "project_id 1"
    And I should see "user_id 1"

  # Rails generates Delete links that use Javascript to pop up a confirmation
  # dialog and then do a HTTP POST request (emulated DELETE request).
  #
  # Capybara must use Culerity/Celerity or Selenium2 (webdriver) when pages rely
  # on Javascript events. Only Culerity/Celerity supports clicking on confirmation
  # dialogs.
  #
  # Since Culerity/Celerity and Selenium2 has some overhead, Cucumber-Rails will
  # detect the presence of Javascript behind Delete links and issue a DELETE request 
  # instead of a GET request.
  #
  # You can turn this emulation off by tagging your scenario with @no-js-emulation.
  # Turning on browser testing with @selenium, @culerity, @celerity or @javascript
  # will also turn off the emulation. (See the Capybara documentation for 
  # details about those tags). If any of the browser tags are present, Cucumber-Rails
  # will also turn off transactions and clean the database with DatabaseCleaner 
  # after the scenario has finished. This is to prevent data from leaking into 
  # the next scenario.
  #
  # Another way to avoid Cucumber-Rails' javascript emulation without using any
  # of the tags above is to modify your views to use <button> instead. You can
  # see how in http://github.com/jnicklas/capybara/issues#issue/12
  #
  Scenario: Delete todo
    Given the following todos:
      |name|aasm_state|project_id|user_id|
      |name 1|aasm_state 1|project_id 1|user_id 1|
      |name 2|aasm_state 2|project_id 2|user_id 2|
      |name 3|aasm_state 3|project_id 3|user_id 3|
      |name 4|aasm_state 4|project_id 4|user_id 4|
    When I delete the 3rd todo
    Then I should see the following todos:
      |Name|Aasm state|Project|User|
      |name 1|aasm_state 1|project_id 1|user_id 1|
      |name 2|aasm_state 2|project_id 2|user_id 2|
      |name 4|aasm_state 4|project_id 4|user_id 4|
