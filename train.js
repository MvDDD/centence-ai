const fs = require("fs");

const wordListContent = fs.readFileSync("./sentences.txt", "utf-8");
const wordArray = wordListContent.split("\n").filter(word => word.trim() !== '');

const json = {};

wordArray.forEach(word => {
	for (let i = -20; i < word.length - 1; i++) {
		const charPair = word.substring(i, i+20);
			if (!json[charPair]) {
				json[charPair] = {end:false,val:0};
			}
		if (charPair.length < 5){
			json[charPair]["end"] = true
		}
			json[charPair]["val"] = (json[charPair].val+1)*2
	}
});

console.log(json);
fs.writeFile("modelCen.json", JSON.stringify(json), ()=>{})