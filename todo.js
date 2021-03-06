'use strict';

app.controller('todoController', function($rootScope, $scope) {
    var default_todoList = [{
        title: 'hello world',
        completed: false,
        date: new Date().toJSON()
    }];

    var todo_list_json = localStorage.getItem("todo_list");
    if (!todo_list_json) {
        $scope.todoList = default_todoList;
    } else {
        $scope.todoList = JSON.parse(todo_list_json);
    }

    $scope.saveTodoItems = function(){
        localStorage.setItem("todo_list", JSON.stringify($scope.todoList));
    };

    $scope.addTodo = function(){
        $scope.todoList.push({
            title: $scope.newTodoText,
            completed: false,
            date: new Date().toJSON()
        });
        $scope.newTodoText = '';
        $scope.saveTodoItems();
    };

    $scope.$on('update-todo', function(event, args) {
        switch (args.update_type){
            case 'remove':
                var item_index = $scope.todoList.indexOf(args.item);
                if (item_index > -1) {
                    $scope.todoList.splice(item_index, 1);
                }
                break;
        }
        $scope.saveTodoItems();
    });

    $scope.removeTodo = function($index) {
        $scope.todoList.splice($index, 1);
    };
});

app.directive('todoItem', function($rootScope){
    return {
        restrict: 'E',
        templateUrl: 'todo-item.html',
        scope: {
            todoData: '='
        },
        link: function(scope, element){
              scope.removeTodo = function(item){
                  $rootScope.$broadcast('update-todo', {
                      item: item,
                      update_type: 'remove'
                  });
              };
        }
    };
});