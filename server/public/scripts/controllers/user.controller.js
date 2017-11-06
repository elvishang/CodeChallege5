app.controller('UserController', function (UserService, $uibModal) {
    var vm = this;
    vm.newUser = {};

    getAll();

    function getAll() {
        UserService.getAll()
            .then(function (users) {
                vm.users = users;
            });
    }

    vm.updateUser = function (user){
        UserService.updateUser(user._id)
            .then(getAll)
            .catch(onError);
    }

    vm.deleteUser = function (user) {
        UserService.deleteUser(user._id)
            .then(getAll)
            .catch(onError);
    }

    vm.addUser = function (user) {
        console.log(user);
        UserService.addUser(user)
            .then(getAll)
            .catch(onError);
    }

    function onError(err) {
        console.log(err);
    }

    vm.animationsEnabled = true;
    
        vm.open = function (item) {
            console.log('open', item);
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/modal.html',
                controller: 'ModalInstancvm',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    item: function () {
                        item.type = 'user';
                        return angular.copy(item);
                    }
                }
            });
    
            modalInstance.result.then(function (updatedItem) {
                console.log('updated');
                console.log(updatedItem);
                UserService.updateUser(updatedItem)
                    .then(function () {
                        angular.merge(item, updatedItem);
                    })
                    .catch(function (err) {
                    })
            }, function () {
                console.log('cancel');
            });
        };
})