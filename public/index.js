var cards
var flipped = 0
var card1
var card2
var currentCard
var matches = 0
var points = 1000
var game = 0
var x
var y


var pointBonus = function(num) {
  points+=num
  var bonus = num
  $(".bonus").css({
    top: y + "px",
    left: x+ "px",
    color: "red",
  })
  if (num > 0) {
    var bonus = "+"+num
    $(".bonus").css("color", "white")
  }
  $(".bonus").text(bonus)
  $(".bonus").fadeIn()

  
  setTimeout(function(){
    $(".bonus").fadeOut()
  }, 500)

}

var pointPenalty = function(){
  points-=25
  
  $(".bonus").css({
    top: y+ "px",
    left: x+ "px",
    color: "red",
  })
  $(".bonus").text("-25")
  $(".bonus").fadeIn()


  setTimeout(function(){
    $(".bonus").fadeOut()
  }, 500)
}

var newGame = function() {
  game += 1
  dealCards()
  pointClock()
}

var pointClock = function() {
  var pointInterval = setInterval(function(){
    points -= 1
    $("#scoreboard").text("Your score: "+this.points)
  }, 100)

//move this off pointClock - because it gets rebound each time - and multiplies
  eventDispatcher.on("match", function(){
    matches += 1

    if (matches === 8*game) {
      clearInterval(pointInterval)
      
      eventDispatcher.trigger("gameover")
    }
  })

}

var pointCounter = function() {
  points-=1
}

var clearBoard = function() {
  $("#card-container").empty()
  $("#removed-box").empty()
  matches = 0
  points = 1000
}

function dealCards() {
  clearBoard()
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

  eventDispatcher.on("card:flipped", function(card, event){

    //reset round when a third card is revealed
    if (flipped === 2) {
      if (card1.color === card2.color) {
        //remove the cards
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

    if (flipped === 2) {
      if (card1.color === card2.color) {
        pointBonus(+50)
        eventDispatcher.trigger("match")
        var htmlString = $("<div class='dead-card' style='background:"+card2.color+"''></div>")
        $("#removed-box").append(htmlString)
      } else {
        pointBonus(-25)
      }
    }
  })



  eventDispatcher.on("gameover", function(){
    
    $("#winnerboard").prepend("<div class='score'>Game "+game+": "+points+" points</div>")

    _.each(cards, function(card){
      card.restoreCard()
      
    })

    
  })

  $("#new-game").on("click", function(){
    newGame()
  })

  newGame()


})