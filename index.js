
// ====================================
// import funcgion for initializing the api route.
// function for calback whent the page loads
// ====================================
function requestSearch(string) {
	if(string) {
		var request = gapi.client.youtube.search.list({
			part: "snippet",
			type: "video",
			q: `${string}`,
			maxResult: 3,
			order: "viewCount",
		})
		todoWrapper.classList.add('hide');
		videos.classList.remove('hide');


		request.execute((response) => {
			var data = response.result;
			var videos = document.querySelector('.videos');
			videos.innerHTML = '';
			data.items.forEach((item, index) => {
				console.log(item ,'items');
				var div = document.createElement('div');
				var h1 = document.createElement('h1');
				h1.textContent = item.snippet.title;


				var iframe = `<iframe src="//www.youtube.com/embed/${item.id.videoId}${index===0? '?rel=0&autoplay=1' : ''}" height="300" width="600" allowfullscreen></iframe>`;

				div.innerHTML = iframe;
				div.appendChild(h1);
				videos.appendChild(div);
			})
		})
	}
}

// ====================================
// initializing the youtube api
// ====================================
function init(string) {
	gapi.client.setApiKey('AIzaSyCgb7eZaOT9g6v0GhYNvAt1ltGBb6vN4Ew');
	gapi.client.load('youtube', 'v3',() => requestSearch(string));
}







// ====================================
// browser sppech recogniser code
// ====================================

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interinResults = true;
recognition.lang = 'en-IND';

// ====================================
// ====================================





// ====================================
// creating todos 
// ====================================
var allTodos = JSON.parse(localStorage.getItem('todos')) || [];
var todoWrapper = document.querySelector('.todoWrapper');
var rootElement = document.querySelector('.root');
rootElement.classList.add('hide');
var videos = document.querySelector('.videos');


// ====================================
// function to store all the tasks.
// ====================================
function storeTask(string) {
	var arr = string.split(' ');
	arr.splice(0,1);

	if(arr.join('')) {
		var newTodo = {
			todoText : arr.join(' '),
			isComplete: false,
		};

		allTodos.push(newTodo);

		displayTodo(allTodos);
	}
}


// ====================================
// removing specific item from todo list.
// ====================================
function removeTodo(string) {
	var arr = string.split(' ');
	arr.splice(0, 1);
	if(arr[0] == 'one') {
		allTodos.splice(0, 1);
		displayTodo(allTodos);
		return;
	} 
	if(!isNaN(+(arr[0]) % 2)) {
		allTodos.splice(+(arr[0])-1, 1);
		displayTodo(allTodos);
		return;
	}
}



// ====================================
// function for displaying the todos.
// ====================================
function displayTodo(array) {
	localStorage.setItem('todos', JSON.stringify(allTodos));
	var ul = document.querySelector('.listWrap');
	ul.innerHTML = '';
	if(array) {
		array.forEach((todo, index) => {
			var div = document.createElement('div');
			div.classList.add('list');
			var list = document.createElement('li');

			var todoText = document.createElement('p');
			todoText.textContent =todo.todoText;

			list.setAttribute('data-id', index);
			todoText.setAttribute('data-id', index);


			list.appendChild(todoText);

			div.appendChild(list);
			ul.appendChild(div);
		});
	}
}


// =======================================
// speech recognition...
// =======================================
recognition.addEventListener('result', e => {
	console.log(e)
	let speech = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
	if(e.results[0].isFinal) {
		const keyWord = speech.split(' ')[0];
		console.log(keyWord)
		console.log(speech);
		if(speech === 'remove all' || speech === 'delete all') {
			console.log('remove all function');
			allTodos.length = 0
			displayTodo(allTodos);
			return;
		}

		if(speech.toLowerCase() === 'clear youtube' ||speech.toLowerCase() === 'remove youtube') {
			console.log('removing youtube page');
			videos.classList.add('hide');
			todoWrapper.classList.remove('hide')
			return;
		}

		if(speech === 'hide' || speech === 'hide all') {
			rootElement.classList.add('hide');
			videos.classList.add('hide');
			return;
		}

		if(speech === 'display' || speech=== 'show' || speech === 'display all') {
			rootElement.classList.remove('hide');
			displayTodo(allTodos);
			return;
		}

		if(keyWord === 'add' || keyWord === 'create') {
			storeTask(speech);
			return;
		} else if(keyWord === 'delete' || keyWord === 'remove') {
			removeTodo(speech);
			return;
		} else if(keyWord === 'play' || keyWord === 'sing' || keyWord === 'search') {
			init(speech);	
			return;
		}

	}
})


recognition.addEventListener('end', recognition.start);
displayTodo(allTodos);
recognition.start();






