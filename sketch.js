let query = "";
let canvasWidth = 800;
//let canvasWidth = windowWidth;
let canvasHeight = 600;
//let canvasHeight = windowHeight;
var table;
var tableArray;
var list;
var R = 150;
var G = 150;
var B = 150;
var failedAttempts = 0;

  function preload(){
      readList();

      console.log("Total number of columns: " + table.getColumnCount())
      console.log("Total number of rows: " + table.getRowCount())
  }

function setup() {
  frameRate(30);
  createCanvas(canvasWidth, canvasHeight);
  background(100);


  console.log("Total number of columns: " + table.getColumnCount())
  console.log("Total number of rows: " + table.getRowCount())

  //Convert table to array
  var tableArray = table.getArray();
  list = tableArray[0];
}

function draw() {
  background(R, G, B);

  textSize(20);
  fill(255);
  text("Remaining elements: " + list.length, 50, 350);
  textSize(60);
  text(query, 50, canvasHeight/2 - 60, canvasWidth, canvasHeight);
  console.log(query)

  textSize(12);
  text("Failed attempts: " + failedAttempts, 50, 50);

  //Print entire list
  for(let i = 0; i<list.length; i++){
    textSize(10);
    //fill(random(0, 255), random(0, 255), random(0, 255))
    text(list[i], random(20, canvasWidth- 50), random(20, canvasHeight-20) )
  }

  //Find next character in query
  nextCharacter();

}

function keyPressed(){
  if (keyCode === 13){
    nextCharacter();
    console.log("Next character")
  }
}

function filterWords(){
  for (let i = 0; i < list.length; i++) {
    //Remove words that don't match the query
    if (list[i].substring(0, query.length).toUpperCase() !== query.toUpperCase()) {
      list.splice(i, 1);
    }
  }
}

function nextCharacter(){
    let nextCharacter = randomCharacter();

    console.log("Testing for " + nextCharacter);
    for(let i = 0; i < list.length; i++){
      console.log("Index " + i)
      console.log(list[i])
    }

    //Check if there are more words in list
    if(list.length>1){
      let tempQuery = query + nextCharacter;

      //Test if any words match new query
      let remainingWords = false;
      //Check if any words match new query
      for (var i = 0; i < list.length; i++) {
        if (list[i].substring(0, tempQuery.length).toUpperCase() === tempQuery.toUpperCase()) {
            remainingWords = true;
        }
      }

      //Set to new query
      if (remainingWords) {
        query = tempQuery;
        R = random(0, 255);
        G = random(0, 255);
        B = random(0, 255);
      }
      else {
        failedAttempts++;
      }
    }

    if(list.length===1)
      query = list[0];

    //else(
      //Print remaining word
      //console.log("Only one word in list: " + list[0]);
    //)

    //Filter out words that don't match
    filterWords();
}

function randomCharacter(){
  let characters = [];

  //Norwegian alphabet
  characters.push("a");
  characters.push("b");
  characters.push("c");
  characters.push("d");
  characters.push("e");
  characters.push("f");
  characters.push("g");
  characters.push("h");
  characters.push("j");
  characters.push("k");
  characters.push("l");
  characters.push("m");
  characters.push("n");
  characters.push("o");
  characters.push("p");
  characters.push("q");
  characters.push("r");
  characters.push("s");
  characters.push("t");
  characters.push("u");
  characters.push("v");
  characters.push("w");
  characters.push("x");
  characters.push("y");
  characters.push("z");
  characters.push("æ");
  characters.push("ø");
  characters.push("å");

  //Special characters
  characters.push("-");
  characters.push("&");
  characters.push(" ");

  //Returns a random element
  return characters[Math.floor(Math.random()*characters.length)];
}

function readList(){
  table = loadTable("assets/asd.csv", "csv")

  console.log("Printing imported table")
  console.log("Total number of columns: " + table.getColumnCount())
  console.log("Total number of rows: " + table.getRowCount())
  for (var i = 0; i < table.length; i++) {
    console.log(table[i])
  }
}
