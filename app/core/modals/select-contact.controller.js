/* global angular, console */

angular.module('app')
.controller('SelectContactCtrl', function ($scope, Contacts) {
	'use strict';

	const network = $scope.data.network;

	$scope.cancel = cancel;
	$scope.select = select;

	$scope.contacts = Contacts.forNetwork(network);
	$scope.heading	= $scope.data.heading;

	function cancel() {
		$scope.closeModalService();
	}

	function select(contact) {
		$scope.modalResolve(contact);
	}
});
