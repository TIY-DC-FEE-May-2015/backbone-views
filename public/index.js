var cards
var flipped = 0
var card1
var card2
var currentCard

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

    // Instantiate a new card view
    var card = new Card({ 
      color: color 
    })

    // Append that card view into the page
    $("#card-container").append( card.$el )

    // Return it (from the map iterator)
    return card

  })

  eventDispatcher.on("card:flipped", function(card){
    //reset round when a third card is revealed
    if (flipped === 2) {
      card1.flipBack(card1)
      card2.flipBack(card2)
      flipped=0
      currentCard = ""
      card1=""
      card2=""
    }  

    if (currentCard !== card.cid){
      //store current card and card colors
      currentCard = card.cid
      card1 = card2
      card2 = card
      console.log(currentCard, card1, card2)

      flipped+=1
      //if two are revealed, play round
      if (flipped === 2) {
        //check for a matched pair
        if (card1.color === card2.color) {
          console.log("matched pair")
          
          //remove the cards and add points
          $("#removed-box").append(card2.color + "<br>")
          card1.removeCard()
          card2.removeCard()
          

        }

        //end of round; reset the storage vars

      }
    }

  })

})