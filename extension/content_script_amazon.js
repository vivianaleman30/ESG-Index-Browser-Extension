async function append_scores(score_database, name_database) {
	await sleep(2000);
	var items = document.getElementsByClassName('s-item-container');
	for (var i = 0; i < items.length; i++) {
		try {
			var item = items[i].getElementsByClassName('a-size-small')[1];
			var name = item.innerHTML.toLowerCase();
			if (name.includes("| <i>political spending rating:")) { continue; }
			name = name.replace("&amp;", "&").replace(/[^a-z0-9]/g, '');
			if (name == "by") {
				item = items[i].getElementsByClassName('a-size-small')[2]
				name = item.innerHTML.toLowerCase().replace(/[^a-z0-9]/g, '');
			}
			if (name_database[name]) { name = name_database[name]; }
			var append = '<span class="esgindexrating"> | <i>Political Spending Rating: ';
			var invalid = false;
			if (score_database[name] >= 0) {
				append += Math.round(score_database[name] * 1000) / 1000;
			} else {
				append += 'N/A';
				append = append.replace(/esgindexrating/g, '')
				if (score_database[name] == -1) {
					invalid = true;
				} else {
					console.log('[ESG Index] "' + name + '" not found in ESG database')
				}
			}
			append += '</i></span>'
			if (!invalid) {
				item.innerHTML += append;
			}
		} catch (e) {
			name = '';
			console.log('[ESG Index] ' + e);
		}
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

append_scores(window.esgindexscores, window.esgindexnames);
