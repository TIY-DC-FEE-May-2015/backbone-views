// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)

var clicks = 0
var colorOne = ""
var colorTwo = ""
var savedColor

// todo
var Card = Backbone.View.extend({

	className: "card",	

  // more todo
  events: {
  		"click": "clickInput"
  	  },

  // also todo
  initialize: function(viewData) {
    this.$container = viewData.$container

    this.render(viewData)
  },

  render: function(viewData) {
  	this.viewData = viewData

  	this.$el.html( this.template(viewData) )

  	this.$container.append( this.$el )

  	this.$el.css('background-image', "url('http://s3.amazonaws.com/spoonflower/public/design_thumbnails/0112/0908/rrrchevronbig-lightergrey_shop_preview.png')")
  },

  clickInput: function() {
  	this.$el.css('background', this.viewData.color)
  	console.log(this.$el.css('background', this.viewData.color))

  	clicks+=1

  	if (clicks === 1 ) {
  		colorOne = this.viewData.color
  		savedColor = this.$el

  	}

  	if (clicks === 2) {
  		colorTwo = colorOne
  		colorOne = this.viewData.color
	}

	if (colorOne === colorTwo) {

		this.$el.css('display', "none")		
		savedColor.css('display', "none")

		console.log(clicks)

		colorTwo = ""
		colorOne = ""
		clicks = 0
	}
  	
  	if (clicks === 3) {
  		$(".card").css('background-image', 'url("http://s3.amazonaws.com/spoonflower/public/design_thumbnails/0112/0908/rrrchevronbig-lightergrey_shop_preview.png")')

  		colorOne = ""
  		colorTwo = ""
  		clicks = 0
  	}

  },

  template: Handlebars.compile( $("#card-template").html() )

})

