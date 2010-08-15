class CategoriesController < ApplicationController
  before_filter :require_user
  
  # GET /categories
  # GET /categories.xml
  def index
    @categories         = current_user.categories
    @category           = Category.new
    @everything_count   = current_user.categories.sum(:task_count)
    @focus_count        = current_user.categories.sum(:focus_count)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @categories }
    end
  end
  
  # GET /everything
  # GET /everything.xml
  def everything
    tasks = Task.for_user(current_user).listable
    @tasks_count = tasks.count
    @incomplete_tasks_count = Task.for_user(current_user).incomplete.count
    @everything = tasks.group_by{|t| t.category}
    @categories = current_user.categories
    @task = Task.new

    respond_to do |format|
      format.html { render :layout => 'tasks'} # everything.html.erb
      format.xml  { render :xml => @everything }
    end
  end

  # GET /categories/1
  # GET /categories/1.xml
  def show
    @category = current_user.categories.find(params[:id])
    @task = Task.new
    
    respond_to do |format|
      format.html { redirect_to category_tasks_path(@category) }
      format.xml  { render :xml => @category }
    end
  end

  # GET /categories/new
  # GET /categories/new.xml
  def new
    @category = Category.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @category }
    end
  end

  # GET /categories/1/edit
  def edit
    @category = current_user.categories.find(params[:id])
  end

  # POST /categories
  # POST /categories.xml
  def create
    @category = Category.new(params[:category])

    respond_to do |format|
      if current_user.categories << @category
        format.html { redirect_to(categories_path, :notice => 'Category was successfully created.') }
        format.xml  { render :xml => @category, :status => :created, :location => @category }
        format.json { render :json => @category }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @category.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /categories/1
  # PUT /categories/1.xml
  def update
    @category = current_user.categories.find(params[:id])

    respond_to do |format|
      if !@category.nil? and @category.update_attributes(params[:category])
        format.html { redirect_to(@category, :notice => 'Category was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @category.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.xml
  def destroy
    @category = current_user.categories.find(params[:id])
    @category.destroy

    respond_to do |format|
      format.html { redirect_to(categories_url) }
      format.xml  { head :ok }
    end
  end
  
end
