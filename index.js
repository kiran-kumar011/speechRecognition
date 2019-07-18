// browser sppech recogniser code
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interinResults = true;



// creating todos 
var allTodos = JSON.parse(localStorage.getItem('todos')) || [];


function storeTask(string) {
	var arr = string.split(' ');
	console.log(arr.splice(0 , 1));

	console.log(arr.join(''))
	var newTodo = {
		todoText : arr.join(' '),
		isComplete: false,
	};

	allTodos.push(newTodo);

	displayTodo(allTodos);
}


// removing specific todo.
function removeTodo() {

}







// function for displaying the todos.
function displayTodo(array) {
	localStorage.setItem('todos', JSON.stringify(allTodos));
	var ul = document.querySelector('.listWrap');
	ul.innerHTML = '';
	if(array) {
		array.forEach((todo, index) => {
			var div = document.createElement('div');
			div.classList.add('list');
			var list = document.createElement('li');
			var checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.setAttribute('data-id', index);

			var delet = document.createElement('p');
			delet.textContent = 'X';
			delet.setAttribute('data-id', index);

			var todoText = document.createElement('p');
			todoText.textContent =todo.todoText;

			list.setAttribute('data-id', index);
			todoText.setAttribute('data-id', index);


			list.appendChild(checkBox);
			list.appendChild(delet);
			list.appendChild(todoText);

			div.appendChild(list);
			ul.appendChild(div);
		});
	} 
	
}





recognition.addEventListener('result', e => {
	let speech = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
	if(e.results[0].isFinal) {
		const keyWord = speech.split(' ')[0];
		console.log(keyWord)

		if(keyWord === 'add' || keyWord === 'create') {
			console.log('add..... inside the listener')
			storeTask(speech);
		} else if(keyWord === 'delete' || keyWord === 'remove') {
			removeTodo()
		}
	}
})



recognition.addEventListener('end', recognition.start);
displayTodo(allTodos);
recognition.start();






