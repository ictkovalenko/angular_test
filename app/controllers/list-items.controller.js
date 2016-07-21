(function() {
    'use strict';

    angular.module('testApp')
        .controller('ListItemsController', ListItemsController);

    ListItemsController.$inject = ['$scope', 'listItemsService'];

    /* @ngInject */
    function ListItemsController($scope, listItemsService) {
        var vm = this;

        this.items = [];
        this.item = {name: ''};
        this.init = init;
        this.deleteItem = deleteItem;
        this.deleteChecked = deleteChecked;
        this.addItem = addItem;
        this.editItem = editItem;
        this.sortableOptions = {
            update: (e, ui) => {
                setTimeout(() => listItemsService.setItems(this.items), 0);
            }
        }

        //////////////////////////////////////////////////////////////////

        function init() {
            listItemsService.getItems()
                .then((data) => {
                    vm.items = data;
                    $scope.$apply();
                });
        }

        function deleteItem(item) {
            listItemsService.deleteItem(item);
        }

        function deleteChecked() {
            listItemsService.deleteChecked()
                .then((data) => {
                    vm.items = data;
                $scope.$apply();
            });
        }

        function addItem() {
            if (vm.item.name !== '') {
                listItemsService.addItem(vm.item.name);
                vm.item.name = '';
            }
        }

        function editItem(item) {
            listItemsService.editItem(item);
        }
    }
})();