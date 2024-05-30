function generateNextCharacter(json, currentPair, add) {
    // Filter possible next pairs based on the current pair
    const possibleNextPairs = Object.entries(json)
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
            return pair.slice(currentPair.length, currentPair.length + parseInt(add)) || null;
        }
    }
}

function generate(json, start, maxlength, overlap, add, amount){
    let outputs = []
    for (let i = 0; i < parseInt(amount); i++) {
    // Initialize the generated string with the starting pair
        const startingPair = start;
        let generatedString = startingPair;
        let nextChar;

    // Continue generating the string until it reaches the desired length or no next character is available
        while (generatedString.length < maxlength && (nextChar = generateNextCharacter(json, generatedString.slice(-parseInt(overlap)),add)) !== null) {
            generatedString += nextChar || "";
        }
        outputs.push(generatedString);
    }
    return outputs
}