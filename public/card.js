// Using a common eventDispatcher for this project is a good idea.
var eventDispatcher = _.clone(Backbone.Events)

var clicks = 0
var colorOne = ""
var colorTwo = ""
var savedColor1
var savedColor2
var cid1
var matches = 0

// todo
var Card = Backbone.View.extend({

  className: "card",  

  // more todo
  events: {
      "click": "clickInput"
      },

  // also todo
  initialize: function(viewData) {

    this.render(viewData)

    this.$el.addClass("back")
    this.$el.css('background-color', this.viewData.color)

  },

  render: function(viewData) {
    this.viewData = viewData

    this.$el.html( this.template(viewData) )

  },

  clickInput: function() {
    this.$el.removeClass("back")

    clicks+=1
    console.log(clicks)

    if (clicks === 1 ) {
      colorOne = this.viewData.color
      savedColor1 = this.$el
      cid1 = this.cid

    }
    // Makes sure the same card isn't pressed twice
    if (clicks === 2 && this.cid === cid1) {
      clicks = 1
    }

    if (clicks === 2 && this.cid !== cid1) {
      colorTwo = colorOne
      colorOne = this.viewData.color
      savedColor2 = this.$el
     
       // Checks for match
      if (colorOne === colorTwo) {

        // Allows player to see matching cards before removing
          setTimeout(function() {
            savedColor2.css('background', 'none').css('border', 'none')
            savedColor1.css('background', 'none').css('border', 'none')

            matches += 1
            console.log(matches)
            colorTwo = ""
            colorOne = ""
            clicks = 0
            savedColor2 = ""
            savedColor1 = ""
            // Signal end of game
            if (matches === 8) {
              alert("You Win!")
            }
        }, 1000)
      }
      // Turns cards over if cards do not match
      if (colorOne !== colorTwo) {
        setTimeout(function() {

          savedColor1.addClass("back")
          savedColor2.addClass("back")

          colorOne = ""
          colorTwo = ""
          clicks = 0
        }, 1000)
      }
    }
    
  },

  template: Handlebars.compile( $("#card-template").html() )

})

