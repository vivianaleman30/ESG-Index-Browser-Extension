function append_scores(score_database, name_database) {
	var items = document.getElementsByClassName('s-item-container');
	for (var i = 0; i < items.length; i++) {
		try {
			var item = items[i].getElementsByClassName('a-size-small')[1];
			var name = '';
			name = item.innerHTML.toLowerCase();
			name = name.replace(/[^a-z0-9]/, '');
			if (name_database[name]) { name = name_database[name]; }
			var append = '<span class="esgindexrating"> | <i>Political Spending Rating: ';
			var invalid = false;
			if (score_database[name] >= 0) {
				append += Math.round(score_database[name] * 1000) / 1000;
			} else {
				append += 'N/A';
				append = append.replace(/esgindexrating/, '')
				if (score_database[name] == -1) {
					invalid = true;
				} else {
					console.log('"' + name + '" not found in ESG database')
				}
			}
			append += '</i></span>'
			if (!invalid) {
				item.innerHTML += append;
			}
		} catch (e) {
			name = '';
			console.log('[ESG Index]' + e);
		}
	}
}

append_scores(window.esgindexscores, window.esgindexnames);
