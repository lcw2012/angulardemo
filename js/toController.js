(function (angular) {
	var app1 = angular.module('todoApp.todoCtrl', ['ngRoute']);
	// 配置路由
	app1.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/:status?', {
			templateUrl: 'todoView.html',
			controller: 'TodoController'
		});
	}]);
	// 创建控制器
	app1.controller('TodoController', ['$scope', '$location', '$routeParams', 'todoSrv',
		function($scope, $location, $routeParams, todoSrv){
		$scope.todoList = todoSrv.getData();
		// 2 添加任务
		$scope.newTask = '';
		$scope.add = function() {
			if(!$scope.newTask) {
				return;
			}
			todoSrv.addData($scope.newTask);
			// 清空文本框
			$scope.newTask = '';
		};
		// 3 删除一条任务
		$scope.remove = function(id) {
			todoSrv.removeData(id);
		};
		// 4 修改任务
		$scope.updateId = -1;
		$scope.update = function(id) {
			$scope.updateId = id;
		};
		$scope.save = function() {
			$scope.updateId = -1;
			// 保存数据
			todoSrv.saveData();
		};
		$scope.isCheckedAll = false;
		$scope.selectAll = function() {
			todoSrv.selectAll($scope.isCheckedAll);
		};
		// 5.1 切换单个任务的选中状态
		$scope.$watch('todoList', function(newValue, oldValue) {
			if(newValue === oldValue) return;
			todoSrv.saveData();
		}, true);
		// 6 清除已完成任务
		$scope.clearCompleted = function() {
			todoSrv.clearCompleted();
			$scope.todoList = todoSrv.getData();
		};
		// 6.1 控制清除按钮的展示或隐藏
		$scope.isShow = function() {
			for(var i = 0; i < $scope.todoList.length; i++) {
				var todo = $scope.todoList[i];
				if(todo.isCompleted) {
					return true;
				}
			}
			return false;
		};
		// 7 显示未完成任务数
		$scope.getCount = function() {
			var count = 0;
			$scope.todoList.forEach(function(value) {
				if(!value.isCompleted) {
					count += 1;
				}
			});
			return count;
		};
		switch($routeParams.status) {
				case '':
					$scope.status = {};
					break;
				case 'active':
					$scope.status = {isCompleted: false};
					break;
				case 'completed':
					$scope.status = {isCompleted: true};
					break;
				default:
					$scope.status = {};
					break;
			}
	}]);
})(angular);
