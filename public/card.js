// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)


// todo
var Card = Backbone.View.extend({

  className: "card",
  // more todo
  events: {
  	"click": "flipCard"
  },

  // also todo
  initialize: function(viewData) {
  	
    this.render(viewData)
  },

  render: function(viewData) {
  	this.color = viewData.color;
  	console.log(this.color)
  },

  flipCard: function() {
  	numClicks += 1;
    this.$el.css('background-color', this.color);
    
    if (numClicks === 1) {
    	firstCard = this.$el;
    	firstCardColor = this.$el.css( "background-color" );
    }
    if (numClicks === 2) {
    	secondCard = this.$el;
    	secondCardColor = this.$el.css( "background-color" );
    	if (firstCardColor === secondCardColor) {
    		alert("match!");
    		firstCard.remove();
    		secondCard.remove();
    	} else {
    		console.log("nope");
    	}
    }
    // reset
    if (numClicks === 3) {
    	numClicks = 0;
    	$(".card").css('background-color', 'lightgrey')
    }
  }

})

var firstCard;
var secondCard;
var firstCardColor;
var secondCardColor;
var numClicks = 0;
