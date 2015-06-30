// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)


// todo
var Card = Backbone.View.extend({

  // more todo
  events: {
  	
        "click": "flipped",
  },

  // also todo
  initialize: function(viewData) {
   this.render(viewData)
  
  },

  render: function(viewData){
  	this.data = viewData
  	
  	console.log(this.data.color)
  },

 flipped: function() {
 	this.$el.css("background-color", this.data.color)
    //this.$el.toggleClass()
  },

  
  
})