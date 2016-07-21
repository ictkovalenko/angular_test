(function() {
    'use strict';

    angular.module('testApp')
        .service('listItemsService', listItemsService);

    listItemsService.$inject = ['$mdDialog', 'localStorageService'];

    /* @ngInject */
    function listItemsService($mdDialog, localStorageService) {
        var items = [];

        var updateState = function() {
            localStorageService.set('items', items);
        };

        this.getItems = function() {
            items = localStorageService.get('items');
            if (items === null) {
                items = [];
            }

            return new Promise((resolve, reject) => {
                resolve(items);
            });
        };

        this.setItems = function(new_items) {
            items = new_items;
            updateState();
        };

        this.deleteItem = function(item) {
            items.splice(items.indexOf(item), 1);
            updateState();

            return new Promise((resolve, reject) => {
                resolve(items);
            });
        };

        this.deleteChecked = function() {
            items = items.filter((item) => !item.checked);
            updateState();

            return new Promise((resolve, reject) => {
                resolve(items);
            });
        };

        this.addItem = function(name) {
            items.push({name: name});
            updateState();
        };

        this.editItem = function(item) {
            const edit = $mdDialog.prompt()
                .title('Edit item')
                .textContent('Item name')
                .placeholder('Item name')
                .ariaLabel('Item name')
                .initialValue(item.name)
                .ok('Edit')
                .cancel('Cancel');

            $mdDialog.show(edit).then((result) => {
                if (result !== '') {
                    item.name = result;
                    updateState();
                }
            });
        };
    }
})();