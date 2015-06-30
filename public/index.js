var cards

$(document).on("ready", function(){

  // Create a 16-member array with 2 each of eight colors
  var colors = [ 
    "red", "red", 
    "blue", "blue", 
    "green", "green", 
    "yellow", "yellow", 
    "purple", "purple", 
    "orange", "orange",
    "gray", "gray",
    "black", "black"
  ]

  // Shuffle that array
  colors = _.shuffle(colors)

  // Create an array of Card views based on the randomized color array
  cards = _.map(colors, function(color){

    // Instantiate a new card view along with position
    var card = new Card({ 
      color: color,
      className: color,
   
    })
    

    // Append that card view into the page
    $("#card-container").append( card.$el )
  

    // Return it (from the map iterator)
    return card

  })
 
})