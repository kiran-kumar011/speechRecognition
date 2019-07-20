
function requestSearch(string) {
	console.log('...........request search triggered')
	// e.preventDefault();
	var request = gapi.client.youtube.search.list({
		part: "snippet",
		type: "video",
		q: `${string}`,
		maxResult: 3,
		order: "viewCount",
		publishedAfter: "2015-01-01T00:00:00Z",
	})


	request.execute((response) => {
		console.log(response);
	})
}



function init(string) {
	gapi.client.setApiKey('AIzaSyCgb7eZaOT9g6v0GhYNvAt1ltGBb6vN4Ew');
	gapi.client.load('youtube', 'v3',() => requestSearch(string));

}
