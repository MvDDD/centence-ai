let fs = require("fs")
let charPairFrequencies = require("./model.json");

// Function to generate the next character based on the current pair
function generateNextCharacter(currentPair) {
    // Filter possible next pairs based on the current pair
    const possibleNextPairs = Object.entries(charPairFrequencies)
    .filter(([pair, data]) => pair.startsWith(currentPair) && data.val > 0);

    // If no possible next pairs found, return null
    if (possibleNextPairs.length === 0) {
        return null;
    }

    // Calculate total frequency of possible next pairs
    const totalFrequency = possibleNextPairs.reduce((total, [pair, data]) => total + data.val, 0);

    // Generate a random value between 0 and totalFrequency
    let randomValue = Math.random() * totalFrequency;

    // Iterate over possible next pairs and select one based on random value
    for (let [pair, data] of possibleNextPairs) {
        randomValue -= data.val;
        if (randomValue <= 0) {
            // Return the next character based on the current pair
            return pair.slice(currentPair.length, currentPair.length + parseInt(process.argv[5])) || null;
        }
    }
}

if (process.argv.length !== 7){
    console.log("\n\nerror: invalid args. usage:\n\tnode generate.js <start : string> <maxlength : int> <overlap : int, min:1, max:19> <filllength: int, min:1, max:(20 - overlap)> <amount : int>\n\n\"hello, i am an AI\" =>\n\tstart = \"hello\"\n\toverlap = 3: \"llo\"\n\tin dataset: \"ello, i a\"\n\tfillength = 1 : \"hello\" + \",\"\n\n\n")
    process.exit()
}
for (let i = 0; i < parseInt(process.argv[6]); i++) {
    // Initialize the generated string with the starting pair
    const startingPair = process.argv[2];
    let generatedString = startingPair;
    let nextChar;

    // Continue generating the string until it reaches the desired length or no next character is available
    while (generatedString.length < parseInt(process.argv[3]) && (nextChar = generateNextCharacter(generatedString.slice(-parseInt(process.argv[4])))) !== null) {
        generatedString += nextChar || "";
    }
    console.log(generatedString);
}