cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.wikitude.phonegap.WikitudePlugin.WikitudePlugin",
      "file": "plugins/com.wikitude.phonegap.WikitudePlugin/www/WikitudePlugin.js",
      "pluginId": "com.wikitude.phonegap.WikitudePlugin",
      "clobbers": [
        "WikitudePlugin"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "phonegap-plugin-media-stream.MediaDevices",
      "file": "plugins/phonegap-plugin-media-stream/www/android/MediaDevices.js",
      "pluginId": "phonegap-plugin-media-stream",
      "clobbers": [
        "navigator.mediaDevices"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "com.wikitude.phonegap.WikitudePlugin": "8.9.1",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-camera": "4.1.0",
    "es6-promise-plugin": "4.2.2",
    "phonegap-plugin-media-stream": "1.2.1",
    "phonegap-plugin-image-capture": "1.1.2"
  };
});