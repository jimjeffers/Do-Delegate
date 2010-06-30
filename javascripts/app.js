(function(){jQuery.fn.clickable=function(options){var defaults,settings;defaults={class_selected:"selected",selector:"a"};settings=jQuery.extend(defaults,options);return $(this).each(function(){return $(this).click(function(event){var item,link;item=$(this);link=$(item.find(settings.selector).get(0));item.hasClass(settings.class_selected)?item.removeClass(settings.class_selected):item.addClass(settings.class_selected);if(event.target.tagName!==settings.selector.toUpperCase()){link.click(function(event){if(link.attr("href")&&link.attr("href")!=="#"){window.location=link.attr("href")}return event.stopPropagation()});return link.click()}})})}})();(function(){var __slice=Array.prototype.slice,__bind=function(func,obj,args){return function(){return func.apply(obj||{},args?args.concat(__slice.call(arguments,0)):arguments)}};jQuery.fn.keyboardable=function(options){var KeyboardNavigation,_a,defaults,keyboard_navigation,settings;defaults={class_active:"active",key_next:"down",key_previous:"up",key_click:"space"};settings=jQuery.extend(defaults,options);KeyboardNavigation=function(objects){this.objects=objects;this.index=false;this.active=false;$(document).bind("keydown",settings.key_next,__bind(function(){return this.next()},this));$(document).bind("keydown",settings.key_previous,__bind(function(){return this.previous()},this));$(document).bind("keydown",settings.key_click,__bind(function(){return this.select()},this));return this};KeyboardNavigation.prototype.next=function(){if(this.index||this.index===0){if(this.index<this.objects.length-1){this.index++}}else{this.index=0}return this.activate(this.index)};KeyboardNavigation.prototype.previous=function(){if(this.index&&this.index>0){this.index--}return this.activate(this.index)};KeyboardNavigation.prototype.activate=function(index){if(this.active){this.active.removeClass(settings.class_active)}this.active=$(this.objects.get(index)).addClass(settings.class_active);return this.active};KeyboardNavigation.prototype.select=function(){if(this.active){return this.active.click()}};if((typeof window!=="undefined"&&window!==null)){if((typeof(_a=window.keyboard_navigation)!=="undefined"&&_a!==null)){keyboard_navigation=window.keyboard_navigation}else{keyboard_navigation=new KeyboardNavigation(this);window.keyboard_navigation=keyboard_navigation}}return this}})();(function(){var Todo;Todo=function(params){this.name=params.name||false;this.status=params.status||"normal";this.link=params.link||false;this.pending=params.pending||false;this.idx=params.idx||false;return this};Todo.prototype.data=function(){var storage,todos;storage=localStorage.getItem("todos");alert(storage);(typeof storage!=="undefined"&&storage!==null)?(todos=JSON.parse(storage)):(todos={idx:0});return todo};Todo.prototype.save=function(){var todo,todos;todo={name:this.name,status:this.status,link:this.link,pending:this.pending};todos=this.data();if(!this.idx){this.idx=todos.idx+1}alert(this.idx);todos[this.idx]=todo;todos.idx=this.idx;return localStorage.setItem("todos",JSON.stringify(todos))};Todo.prototype.find=function(idx){var todo;todo=object[idx];if((typeof todo!=="undefined"&&todo!==null)){return new Todo({name:todo.name,status:todo.status,link:todo.link,pending:todo.pending,index:idx})}else{return false}}})();(function(){$(document).ready(function(){$("#content section > ul > li").keyboardable().clickable();$(document).bind("keydown","d",function(){if($("a#delete").length>0){window.location=$("a#delete").attr("href");return window.location}});$(document).bind("keydown","t",function(){if($("a#today").length>0){window.location=$("a#today").attr("href");return window.location}});$(document).bind("keydown","m",function(){if($("a#move").length>0){window.location=$("a#move").attr("href");return window.location}});$(document).bind("keydown","s",function(){if($("a#send").length>0){window.location=$("a#send").attr("href");return window.location}});$(document).bind("keydown","h",function(){if($("a#back").length>0){window.location=$("a#back").attr("href");return window.location}});return $(document).bind("keydown","b",function(){if($("a#back").length>0){window.location=$("a#back").attr("href");return window.location}})})})();