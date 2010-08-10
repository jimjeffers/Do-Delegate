require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Task do
  before(:each) do
    @user       = Factory.create(:user)
    @category   = Factory.create(:category, :user => @user)
    @task       = Factory.build(:task, :category => @category)
  end

  it "should create a new instance given valid attributes" do
    @task.save.should be(true)
  end
  
  describe "for_user" do
    before(:each) do
       @user_2       = Factory.create(:user, :login => "radioactiveman")
       @category_2   = Factory.create(:category, :user => @user_2)
    end
    it "should only show the tasks for the user passed to the scope" do
      5.times do
        @category.tasks << Factory.build(:task)
      end
      4.times do
        @category_2.tasks << Factory.build(:task)
      end
      Task.for_user(@user).length.should be(5)
      Task.for_user(@user_2).length.should be(4)
    end
  end
end
