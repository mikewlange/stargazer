/* global angular, require */

import 'ionic-sdk/release/js/ionic.bundle';
import platformInfo from './platform-info.js';

angular.module('app.service.ledger-nano', [])
.factory('LedgerNano', function ($q) {
	'use strict';

	let StellarLedger;
	if (platformInfo.isElectron) {
		const electron = require('electron');
		StellarLedger = electron.remote.require('stellar-ledger-api');
	}

	const bip32Path = (index) => `44'/148'/${index}'`;

	const wrapper = (func, field) => $q((resolve, reject) => {
		StellarLedger.comm.create_async()
		.then(comm => {
			const api = new StellarLedger.Api(comm);
			func(api)
			.then(result => resolve(result[field]))
			.catch(err => reject(err))
			.done(() => comm.close_async());
		})
		.catch(err => reject(err));
	});

	const getPublicKey = (index) => {
		const func = api => api.getPublicKey_async(bip32Path(index))
		return wrapper(func, 'publicKey');
	};

	const signTxHash = (index, txHash) => {
		const func = api => api.signTxHash_async(bip32Path(index), txHash);
		return wrapper(func, 'signature');
	};

	//			No Device
	//			Invalid status 6d00				wrong app

	return {
		getPublicKey: getPublicKey,
		signTxHash: signTxHash
	};
});
