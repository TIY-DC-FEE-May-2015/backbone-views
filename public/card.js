// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)
var clicks = 0
var colorOne = ""
var colorTwo = ""

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
  	//console.log(viewData.color)
  	this.$el.css('background-image', "url('http://s3.amazonaws.com/spoonflower/public/design_thumbnails/0112/0908/rrrchevronbig-lightergrey_shop_preview.png')")
  },

  clickInput: function() {
  	this.$el.css('background', this.viewData.color)

  	clicks+=1

  	if (clicks === 1 ) {
  		colorOne = this.viewData.color
  	}

  	if (clicks === 2) {
  		colorTwo = colorOne
  		colorOne = this.viewData.color

  		if (colorOne === colorTwo) {
  			console.log(this.viewData)
  			console.log(colorOne)
  			console.log(colorTwo)
  		}
  	}

  	if (clicks === 3) {
  		$(".card").css('background-image', 'url("http://s3.amazonaws.com/spoonflower/public/design_thumbnails/0112/0908/rrrchevronbig-lightergrey_shop_preview.png")')

  		colorOne = ""
  		colorTwo = ""
  		clicks = 0
  	}


  	console.log(colorOne, colorTwo)

  },




  template: Handlebars.compile( $("#card-template").html() )

})

