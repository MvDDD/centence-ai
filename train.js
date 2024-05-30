function trainSYNC(sentences) {
	const lines = sentences.filter(line => line.trim() !== '').map(line => line.trim());
	model = {};
	lines.forEach(line => {
		for (let i = 0; i < line.length - 1; i++) {
			const charPair = line.substring(i, i + 20);
			if (charPair.length > 0) {
				if (!model[charPair]) {
					model[charPair] = { end: false, val: 0 };
				}
				if (charPair.length < 5 && !line.startsWith(charPair)) {
					model[charPair]["end"] = true;
				}
				model[charPair]["val"] = (model[charPair].val) + 1;
			}
		}
	});
}

async function trainASYNC(sentences) {
	const lines = sentences.filter(line => line.length !== 0);
	let formlines = [[]];
	for (let i = 0; i < lines.length; i++) {
		formlines[formlines.length - 1].push(lines[i]);
		if (formlines[formlines.length - 1].length === 1000) {
			formlines.push([]);
		}
	}
	if (formlines[formlines.length - 1].length === 0) {
		formlines.pop();
	}
	formlines.forEach((subArray, index) => {
		while (formlines[index].length < 1000) {
			formlines[index].push("");
		}
	});
	model = {}
	formlines.forEach(async(lines)=>{
		let promises = []
		lines.forEach((line)=>{
			promises.push(new Promise((resolve)=>{
				for (let i = 0; i < line.length - 1; i++) {
					const charPair = line.substring(i, i + 20);
					if (charPair.length > 0) {
						if (!model[charPair]) {
							model[charPair] = { end: false, val: 0 };
						}
						if (charPair.length < 5 && !line.startsWith(charPair)) {
							model[charPair]["end"] = true;
						}
						model[charPair]["val"] = (model[charPair].val) + 1;
					}
				}
			}))

		})
		await Promise.all(promises)
	})
}