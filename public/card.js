// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)


// todo
var Card = Backbone.View.extend({

	className: "card-box",
  // more todo
  events: {
  	"click .card": "flipCard",
  },

  // also todo
  initialize: function(viewData) {
  	this.color = viewData.color

  	this.render(viewData)
  },

  render: function(viewData) {
  	this.$el.html( this.template(viewData) )
  },

  flipCard: function() {
  	var $card = $(this.el).find(".card")
  	$card.css("background", this.color)
  	//this = a backbone view
  	//$card = a div - the el of this

  	//let listener know that a card has been flipped
  	eventDispatcher.trigger("card:flipped", this)
  },

  flipBack: function() {
  	var $card = $(this.el).find(".card")
  	$card.css("background", "navy")  	
  },

  removeCard: function(){
  	$(this.el).empty()
  },

  template: Handlebars.compile( $("#card-template").html())

})