'use strict';

function saveSettings(settingsFile, settingKey, settingValue) {
    const nconf = require('nconf').file(settingsFile);
    
    nconf.set(settingKey, settingValue);
    nconf.save();
}

module.exports = {
    saveSettings
};
