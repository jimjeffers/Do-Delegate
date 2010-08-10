require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Category do
  before(:each) do
    @user       = Factory.create(:user)
    @category   = Factory.build(:category, :user => @user)
    @task       = Factory.build(:task, :category => @category)
  end

  it "should create a new instance given valid attributes" do
    @category.save.should be(true)
  end
  
  describe "update_task_counts!" do
    before(:each) do
       @category.save
       @category_2 = Factory.create(:category, :user => @user)
       5.times do
         @category.tasks << Factory.build(:task)
       end
    end
    it "should update the counts of tasks as they are saved." do
      Category.find(@category.id).task_count.should be(5)
    end
    it "should add tasks to and from the count if they are checked or unchecked" do
      @category.tasks.first.check!
      Category.find(@category.id).task_count.should be(4)
      @category.tasks.first.uncheck!
      Category.find(@category.id).task_count.should be(5)
    end
    it "should update the focus count when tasks are focused or unfocused" do
      @category.tasks.first.focus!
      Category.find(@category.id).focus_count.should be(1)
      @category.tasks.first.blur!
      Category.find(@category.id).focus_count.should be(0)
    end
  end
end
