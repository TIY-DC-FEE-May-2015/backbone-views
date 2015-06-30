// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)


// todo
var Card = Backbone.View.extend({

  // more todo
  events: {
  	
        "click": "flipped",
  },

  className: "name",

  // also todo
  initialize: function(viewData) {
    this.data = viewData
    
    console.log(this.data.color)
  
  },

 flipped: function() {
  
  count ++;
  this.$el.css('background-color', this.data.color);

  if(count === 1){
    card1 = this.$el
    
    color1 = card1.css("background-color")
    //card1.click(false)
  }
  if (count === 2 ){
    twocard = this.$el
    color2 = twocard.css("background-color")
    //card2.click(false)
      if ( color1 == color2 ){
        alert("You have a Match!")
        color1 = card1.css("display", "none")
        color2 = twocard.css("display", "none")
      }else {
        alert("No Match. Try Again!")
        color1 = card1.css("background-color", "white")
        color2 = twocard.css("background-color", "white")
    }
  
  } 
  if(count === 3){
    count = 0
    count += 1

  }

}

})
  var count = 0
  var card1
  var color1
  var twocard
  var color2
  var cid 
