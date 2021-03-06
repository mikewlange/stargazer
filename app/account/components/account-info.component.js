/* global angular */

import 'ionic-sdk/release/js/ionic.bundle';
import horizon from '../../core/services/horizon.js';

class AccountInfoController {

	constructor(Wallet) {
		this.Wallet = Wallet;
	}

	$onInit() {
		this.account = this.Wallet.current;
		const network = this.account.network;
		if (network !== horizon.public) {
			this.network = horizon.getNetwork(network).name;
		}
		this.lockClass = this.account.isLocallySecure() ? 'icon-lock' : 'icon-lock-open';
	}
}

angular.module('app.component.account-info', [])
.component('accountInfo', {
	controller: AccountInfoController,
	controllerAs: 'vm',
	templateUrl: 'app/account/components/account-info.html'
});
