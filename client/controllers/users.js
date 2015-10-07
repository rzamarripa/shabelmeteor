angular.module("app").controller("LoginCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
 
    vm.credentials = {
      username: '',
      password: ''
    };
 
    vm.error = '';
 
    vm.login = function () {
      $meteor.loginWithPassword(vm.credentials.username, vm.credentials.password).then(
        function () {
          $state.go('empresasCambiar');
        },
        function (err) {
          vm.error = 'Login error - ' + err;
        }
      );
    };
  }
]);

angular.module("app").controller("RegisterCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
    vm.credentials = {
      username: '',
      password: '',
    };
 
    vm.error = '';
    vm.register = function () {
      $meteor.createUser(vm.credentials).then(
        function () {
          $state.go('empresasCambiar');
        },
        function (err) {
          vm.error = err.message;
        }
      );
    };
  }
]);

angular.module("app").controller("ResetCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
 
    vm.credentials = {
      email: ''
    };
 
    vm.error = '';
 
    vm.reset = function () {
      $meteor.forgotPassword(vm.credentials.email).then(
        function () {
          $state.go('requisiciones');
        },
        function (err) {
          vm.error = 'Error sending forgot password email - ' + err;
        }
      );
    };
  }
]);