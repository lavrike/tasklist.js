const main = (document => { //анонимная функция, чтобы весь объект не был глобальным
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach( child => {
                if( typeof child === 'string') {
                    child = document.createTextNode(child);// создание текстового узла, так как строка не распознается как DOM-элемент
                }
    
                element.appendChild(child);
            });
        } 
    
        return element;
    }
    
    function createTodoItem(title) { //создание события
    
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', {className: 'title'}, title);
        const editInput = createElement('input', {type: 'text', className: 'textfield'});
        const editButton = createElement('button', {className: 'edit'}, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete'}, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item'}, checkbox, label, editInput, editButton, deleteButton);
      //прикрепление эл-та к событию, appendCHild
    
        bindEvents(listItem); //вызов функции, после этого кнопки начинают работать
    
        return listItem;
    
    
    }
    //привязка элементов к событию
    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');
    
        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click',deleteTodoItem);
    
    }
    
    function addTodoItem(event) {
        event.preventDefault();
    
        if(addInput === '') {
            return alert('Введите название задачи.');
    }
        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);//добавление задачи в список
        addInput.value = ''; //очищение формы
    
    };
    
    function toggleTodoItem() {
        const listItem = this.parentNode;//доступ к родительскому элементу, к listItem
            listItem.classList.toggle('completed');/*создание класса, который добавляет 
            стиль css при тыканьи на галочку */
    }
    
    function editTodoItem() {
        const listItem = this.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');
    
        if(isEditing) {
            title.innerText = editInput.value;
            this.innerText = "Изменить";
        } else {
            editInput.value = title.innerText;
            this.innerText = 'Сохранить';
        }
            listItem.classList.toggle('editing');
        
        }
    
    function deleteTodoItem() {
        const listItem = this.parentNode;
         todoList.removeChild(listItem); // происходит удаление элемента путем вызова функции из родителя   
            }

    function load () {
        const data = JSON.parse(localStorage.getItem('todos'));
        return data;
    }

    function save () {
        const string = JSON.stringify(data);
        localStorage.setItem('todos', string);
    }
    
    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');
    
    function main() {
        todoForm.addEventListener('submit',addTodoItem);
        todoItems.forEach(item => bindEvents(item));
    }

    return main; 
}) (document); //вызов анонимной функции

main();
