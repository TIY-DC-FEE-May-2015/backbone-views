var cards
var flipped = 0
var card1
var card2
var currentCard
var matches = 0
var points = 1000

var pointCounter = function() {
  points-=1
}

var pointClock = setInterval(function(){
  pointCounter()
  $("#scoreboard").text(points)
}, 100)

function dealCards() {

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

}


$(document).on("ready", function(){

  dealCards()

  eventDispatcher.on("card:flipped", function(card){
    //reset round when a third card is revealed
    if (flipped === 2) {
      if (card1.color === card2.color) {
        //remove the cards and add points
        var htmlString = $("<div class='dead-card' style='background:"+card2.color+"''></div>")
        $("#removed-box").append(htmlString)
        card1.removeCard()
        card2.removeCard()
      } else {
        card1.flipBack(card1)
        card2.flipBack(card2)
      }

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

      flipped+=1
    }

    if (card1.color === card2.color) {
      eventDispatcher.trigger("match")
    }

  })

  eventDispatcher.on("match", function(){
    matches += 1

    if (matches === 8) {
      alert("You did it (finally)!")
      clearInterval(pointClock)
      $("#winnerboard").prepend(points)
  
      _.each(cards, function(card){
        console.log(card)
        card.restoreCard()
      })

      eventDispatcher.trigger("gameover")
    }
  })

  eventDispatcher.on("gameover", function(cards){

    dealCards()
  })


})