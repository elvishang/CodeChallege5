app.service('UserService', function ($http) {
    var vm = this;

    vm.getAll = function () {
        return $http.get('/user').then(function (response) {
            console.log(response);
            return response.data;
        }).catch(function (error) {
            console.log('Failed');
        });
    };

    vm.addUser = function (userToAdd) {
        return $http.post('/user', userToAdd).then(function (response) {
            console.log('success', response);
        }).catch(function (error) {
            console.log('failure');
        })
    };

    vm.deleteUser = function (userId) {
        return $http.delete('/user/' + userId);
    };

    vm.updateUser = function (user) {
        return $http.put('/user/' + user._id, user);
    };
})