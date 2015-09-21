'use strict';

app.controller('todoController', function($rootScope, $scope) {
    $scope.todoList = [{
        title: 'hello world',
        completed: false
    }];

    $scope.addTodo = function(){
        $scope.todoList.push({
            title: $scope.newTodoText,
            completed: false
        });
        $scope.newTodoText = '';
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