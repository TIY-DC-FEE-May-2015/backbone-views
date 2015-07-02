// Using a common eventDispatcher for this project is a good idea.
var card1  
var card2 
var clickCounter = 0
var timer



// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)

	
// todo
var Card = Backbone.View.extend({


  // more todo
 	events: {
  	"click": "clickCard",
  },

  	className:"another-card",

  // also todo
  initialize: function(viewData) {

		  	 this.timer = setTimeout(function(viewData) {
		     this.showCard
		 		}, 5000);
		  	 console.log("Hello")
	
  		this.render(viewData)
    
  },

  render: function(viewData) {
  		this.viewData = viewData
  		console.log(this.$el, this.viewData.color)
  },

  showCard: function(viewData){
  	this.$el.css("background-color",viewData.color)

  },

	



  clickCard: function(){
  	this.$el.html( this.template(this.viewData) )
  	
  	eventDispatcher.trigger("another-card:clicked", this)
  	
  //console.log(this)

  		clickCounter += 1
  	//console.log(clickCounter)

  	if (clickCounter === 1){
  		card1 = this
  		this.$el.css("background-color", this.viewData.color)
  		
  	}

  	if (clickCounter === 2){
  		card2 = this
  		//console.log(this)
  		this.$el.css("background-color", this.viewData.color)
  	}

  	if (clickCounter === 3 && card1 != card2) {
  		
  		//console.log("click 3", card1.viewData.color, card2.viewData.color)
  		if (card1.viewData.color === card2.viewData.color){

	  		card1.$el.hide()
	  		card2.$el.hide()
	  		clickCounter = 0
	  	}
	  	else {
	  		card1.$el.css("background-color","white")
	  		card2.$el.css("background-color","white")
	  		clickCounter = 0

	  	}
	}
	 	
	else{
	 	if (card1 === card2) {
	 		card1.$el.css("background-color","white")
	 		clickCounter= 0
	 	}
	}

	console.log(this.viewData.color)

  },



  template: Handlebars.compile ( $("#card-template").html())
  
})
