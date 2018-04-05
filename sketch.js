let query = "";
let canvasWidth = 800;
//let canvasWidth = windowWidth;
let canvasHeight = 600;
//let canvasHeight = windowHeight;
var table;
var records;


var R = 150;
var G = 150;
var B = 150;
var failedAttempts = 0;

function preload(){
      //Load table
      table = loadTable("assets/data.csv", "csv");
}

function setup() {
  frameRate(30);
  createCanvas(canvasWidth, canvasHeight);
  background(100);

  //Table to Records
  records = table.getArray();
  console.log("Records length: " + records.length )
}

function draw() {
  background(R, G, B);

  //Remaining elements
  fill(255);
  textSize(20);
  text("Remaining elements: " + records.length, 50, 350);

  //Query
  textSize(60);
  text(query, 50, canvasHeight/2 - 60, canvasWidth, canvasHeight);
  console.log(query)

  //Failed attempts
  textSize(12);
  text("Failed attempts: " + failedAttempts, 50, 50);

  //Print all possible outcomes in background whizz
  for(let i = 0; i<records.length; i++){
    textSize(10);
    //fill(random(0, 255), random(0, 255), random(0, 255))
    text(records[i][1], random(20, canvasWidth- 50), random(20, canvasHeight-20) )
  }

  //Next chatacter
  if (records.length>1) {
    nextCharacter();
  }
  else {
    query = records[0][1];
    //Change background to ink colour
    R = records[0][4];
    G = records[0][5];
    B = records[0][6];
  }
}

function filterWordsRecords(){
  console.log("RECORDS:")
  console.log(records);
  for (let i = 0; i < records.length; i++) {
    //Remove words that don't match the query
    console.log("i: " + i)
    console.log(records)
    if (records[i][1].substring(0, query.length).toUpperCase() !== query.toUpperCase()) {
      records.splice(i, 1);
    }
  }
}

function nextCharacter(){
    let nextCharacter = randomCharacter();

    //Check if there are more words in list
    if(records.length>1){
      let tempQuery = query + nextCharacter;

      //Test if any words match new query
      let remainingWords = false;
      //Check if any words match new query
      for (var i = 0; i < records.length; i++) {
        if (records[i][1].substring(0, tempQuery.length).toUpperCase() === tempQuery.toUpperCase()) {
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

    //Filter out words that don't match
    filterWordsRecords();
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
  table = loadTable("assets/data.csv", "csv")
}
