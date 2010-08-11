class TasksController < ApplicationController
  before_filter :require_user
  before_filter :get_category
  
  # GET /tasks
  # GET /tasks.xml
  def index
    @tasks = @category.tasks.listable
    @task = Task.new

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @tasks }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.xml
  def show
    @task = @category.tasks.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @task }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.xml
  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = @category.tasks.find(params[:id])
  end
  
  # GET /tasks/1/complete
  # GET /tasks/1/complete.xml
  def complete
    @task = @category.tasks.find(params[:id])
    if @task
      @task.check! unless @task.completed?
      respond_to do |format|
        
        format.html { redirect_back_or_to category_tasks_path(@category) }
        format.xml  { render :xml => @task }
      end
    end
  end
  
  # GET /tasks/1/undo
  # GET /tasks/1/undo.xml
  def undo
    @task = @category.tasks.find(params[:id])
    if @task
      @task.uncheck! if @task.completed?
      respond_to do |format|
        format.html { redirect_back_or_to category_tasks_path(@category) }
        format.xml  { render :xml => @task }
      end
    end
  end

  # POST /tasks
  # POST /tasks.xml
  def create
    @task = Task.new(params[:task])

    respond_to do |format|
      if @category and @category.tasks << @task
        format.html { redirect_to(category_tasks_path(@category), :notice => 'Task was successfully created.') }
        format.xml  { render :xml => @task, :status => :created, :location => @task }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @task.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.xml
  def update
    @task = current_user.tasks.find(params[:id])

    respond_to do |format|
      if !@task.nil? and @task.update_attributes(params[:task])
        format.html { redirect_to([@category,@task], :notice => 'Task was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @task.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.xml
  def destroy
    @task = @category.tasks.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to(tasks_url) }
      format.xml  { head :ok }
    end
  end
  
  private
  
  # Retrieve the category ID for the task before performing any actions.
  def get_category
    @category = current_user.categories.find(params[:category_id])
    if @category.nil?
      respond_to do |format|
        format.html { redirect_to(categories_path, :error => 'No category was found!')  }
        format.xml  { render :xml => {:error => 'No category was found!'}, :status => :unprocessable_entity }
      end
    end
  end
  
end
