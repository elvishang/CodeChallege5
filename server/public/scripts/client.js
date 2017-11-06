var app = angular.module('UserApp', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: '../templates/user.html',
        controller: 'UserController as vm'
    })
})

angular.module('UserApp').controller('ModalInstancvm', function ($uibModalInstance, item) {
    var vm = this;
    console.log(item);
    vm.item = item;

    vm.ok = function () {
        $uibModalInstance.close(vm.item);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});