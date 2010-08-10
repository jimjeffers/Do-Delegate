Given /^the following categories:$/ do |categories|
  Category.create!(categories.hashes)
end

When /^I delete the (\d+)(?:st|nd|rd|th) category$/ do |pos|
  visit categories_path
  within("table tr:nth-child(#{pos.to_i+1})") do
    click_link "Destroy"
  end
end

Then /^I should see the following categories:$/ do |expected_categories_table|
  expected_categories_table.diff!(tableish('table tr', 'td,th'))
end
