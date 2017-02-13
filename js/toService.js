(function (angular) {

	// 创建服务
	angular.module('todoApp.todoSrv', [])
		.service('todoSrv', ['$window', function($window){
			// $window 这个服务获取到
			var storage = $window.localStorage;
			var dataStr = storage.getItem('todo');
			var todoList = JSON.parse(dataStr) || [];
			// 获取数据的方法
			this.getData = function() {
				return todoList;
			};
			// 保存数据
			this.saveData = function() {
				storage.setItem('todo', JSON.stringify(todoList));
			};
			// 2 添加数据
			this.addData = function(newTask) {
				//无
				var id;
				if(todoList.length === 0) {
					id = 0;
				} else {
					// 有
					id = todoList[ todoList.length - 1 ].id + 1;
				}
				todoList.push({id: id, name: newTask, isCompleted: false});
				// 将数据添加到 localStorage 中的方法
				this.saveData();
			};
			// 3 删除数据
			this.removeData = function(id) {
				for(var i = 0; i < todoList.length; i++) {
					var temp = todoList[i];
					if(temp.id === id) {
						todoList.splice(i, 1);
						// 函数结束，先保存数据
						this.saveData();
						return;
					}
				}
			};
			// 5 切换任务选中状态
			this.selectAll = function(isCheckedAll) {
				for(var i = 0; i < todoList.length; i++) {
					todoList[i].isCompleted = isCheckedAll;
				}

				this.saveData();
			};
			// 6 清除已完成的任务
			this.clearCompleted = function() {
				var temp = [];
				for(var i = 0; i < todoList.length; i++) {
					var todo = todoList[i];
					if(!todo.isCompleted) {
						temp.push(todo);
					}
				}
				todoList = temp;
				this.saveData();
			};
		}]);
})(angular);
