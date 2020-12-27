let query = "";
let canvasWidth = 1280;
let canvasHeight = 700;
let table;
let records;


let R = 150;
let G = 150;
let B = 150;
let failedAttempts = 0;

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
}

function draw() {
      background(R, G, B);

      //Remaining elements
      fill(255);
      textSize(20);
      text("Remaining elements: " + records.length, 50, 390);

      //Query
      textSize(60);
      text(query, 50, canvasHeight/2 - 60, canvasWidth, canvasHeight);
      console.log(query)

      //Failed attempts
      textSize(12);
      text("Failed attempts: " + failedAttempts, 50, 50);

      //Print all possible outcomes in background whizz
      records.forEach(colour => {
            textSize(10);
            text(records[i][1], random(20, canvasWidth- 50), random(20, canvasHeight-20) )
      })

        //Next chatacter
      if (records.length > 1) {
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

//Remove words still in record that don't match the query
function filterWordsRecords(){
      records.forEach(colour => {
            if (records[i][1].substring(0, query.length).toUpperCase() !== query.toUpperCase())
                  records.splice(i, 1);
      })
}

// Try a new character in query
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
  let characters = [
      "a", "b", "c", "d", "e",
      "f", "g", "h","i", "j",
      "k", "l", "m", "n", "o",
      "p", "q", "r", "s", "t",
      "u", "v", "w", "z", "y",
      "z", "æ", "ø", "å", "-",
      "&", " "
  ];

  //Returns a random element
  return characters[Math.floor(Math.random()*characters.length)];
}

function readList(){
  table = loadTable("assets/data.csv", "csv")
}
