class TodoBox extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {data: []};
    this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
    this.generateId = this.generateId.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }
  loadTodosFromServer() {
    // TODO ajax call to server
    this.setState((state) => {data: this.state.data});    
  }
  generateId() {
    return Math.floor(Math.random()*90000) + 10000;
  } 
  componentDidMount() {
    this.loadTodosFromServer();
  }
  addTodo(todo) {
    let todoList = this.state.data;
    todo.id = this.generateId().toString();
    this.setState({data: todoList.concat([todo])});
  }
  removeTodo(nodeId) {
    let todoList = this.state.data;
    let newTodoList = todoList.filter((todo) => todo.id !== nodeId);    

    this.setState({data: newTodoList});
  }
  render() {
    return (
            <div className='todo-box'>
              <h1>TODO List</h1>
              <div>
                <div className='todo-header'>
                  <TodoNew onTodoSubmit={this.addTodo}></TodoNew>
                </div>
                <div className='todo-body'>
                  <TodoList onTodoDestory={this.removeTodo} data={this.state.data}></TodoList>
                </div>                
             </div>
           </div>
           )
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.removeNode = this.removeNode.bind(this);
  }
  removeNode(nodeId) {    
    this.props.onTodoDestory(nodeId);
  }
  render() {
    let todoNodes = this.props.data.map((todo) => <TodoItem key={todo.id} nodeId={todo.id} onTodoDestory={this.removeNode}>{todo.task}</TodoItem>);
    return (<ul className='todo-list list-group'>
              {todoNodes}
           </ul>)
  }
};


class TodoItem extends React.Component {
  constructor(props) {
   super(props);
   this.state = {completed: false};
   this.handleTodoCompletedChange = this.handleTodoCompletedChange.bind(this);
   this.handleDestroyClicked = this.handleDestroyClicked.bind(this);
  }  
  handleTodoCompletedChange() {
    this.setState({completed: !this.state.completed});
  }
  handleDestroyClicked(e) {
    e.preventDefault();
    this.props.onTodoDestory(this.props.nodeId);
  }
  render() {
    var completedClass = this.state.completed ? 'completed ' : ''
    return (
            <li className={completedClass + 'todo-item list-group-item'}>
                <div>
                  <input
                    name='checkbox'
                    className='todo-item-completed'
                    type='checkbox'
                    onChange={this.handleTodoCompletedChange}
                    />
                  <label className='todo-text' for='checkbox'>{this.props.children}</label>
                  <button type="button" className="destroy close" aria-label="Close" onClick={this.handleDestroyClicked}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
            </li>
          )
  }
};

class TodoNew extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: ''};
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }    
    handleKeyPress(e) {
      if(e.key === 'Enter') {        
        this.props.onTodoSubmit({task: e.target.value, completed: false});
        e.target.value = '';
      }
    }
    render() {
      return <input
              className='todo-new form-control'
              type='text'
              placeholder='What do you want to do?'
              onKeyPress={this.handleKeyPress}
              />
    }
};

ReactDOM.render(<TodoBox/>, document.querySelector('.todo-app'));