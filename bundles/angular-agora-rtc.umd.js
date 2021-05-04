(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('agora-rtc-sdk'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-agora-rtc', ['exports', '@angular/core', 'agora-rtc-sdk', '@angular/common'], factory) :
    (factory((global['angular-agora-rtc'] = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,i0,AgoraRTC,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AgoraConfig = (function () {
        function AgoraConfig() {
        }
        return AgoraConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularAgoraRtcService = (function () {
        function AngularAgoraRtcService(config) {
            this.config = config;
            if (!this.checkSystemRequirements()) {
                this.logger('error', 'Web RTC is not supported');
            }
            else {
                this.getDevices();
            }
        }
        /**
         * @return {?}
         */
        AngularAgoraRtcService.prototype.checkSystemRequirements = /**
         * @return {?}
         */
            function () {
                return AgoraRTC.checkSystemRequirements();
            };
        /**
         * @return {?}
         */
        AngularAgoraRtcService.prototype.getDevices = /**
         * @return {?}
         */
            function () {
                var _this = this;
                AgoraRTC.getDevices(function (devices) {
                    /** @type {?} */
                    var audioDevices = devices.filter(function (device) {
                        return device.kind === 'audioinput' && device.deviceId !== 'default';
                    });
                    /** @type {?} */
                    var videoDevices = devices.filter(function (device) {
                        return device.kind === 'videoinput' && device.deviceId !== 'default';
                    });
                    _this.audioDevices = audioDevices;
                    _this.videoDevices = videoDevices;
                });
            };
        /**
         * @param {?=} mode
         * @return {?}
         */
        AngularAgoraRtcService.prototype.createClient = /**
         * @param {?=} mode
         * @return {?}
         */
            function (mode) {
                if (mode === void 0) {
                    mode = 'interop';
                }
                this.client = AgoraRTC.createClient({ mode: mode });
                this.client.init(this.config.AppID);
            };
        /**
         * @param {?} streamID
         * @param {?} audio
         * @param {?=} cameraId
         * @param {?=} microphoneId
         * @param {?=} video
         * @param {?=} screen
         * @return {?}
         */
        AngularAgoraRtcService.prototype.createStream = /**
         * @param {?} streamID
         * @param {?} audio
         * @param {?=} cameraId
         * @param {?=} microphoneId
         * @param {?=} video
         * @param {?=} screen
         * @return {?}
         */
            function (streamID, audio, cameraId, microphoneId, video, screen) {
                if (cameraId === void 0) {
                    cameraId = this.videoDevices[0].deviceId;
                }
                if (microphoneId === void 0) {
                    microphoneId = this.audioDevices[0].deviceId;
                }
                return AgoraRTC.createStream({ streamID: streamID, audio: audio, cameraId: cameraId, microphoneId: microphoneId, video: video, screen: screen });
            };
        /**
         * @param {?} type
         * @param {?} message
         * @return {?}
         */
        AngularAgoraRtcService.prototype.logger = /**
         * @param {?} type
         * @param {?} message
         * @return {?}
         */
            function (type, message) {
                switch (type) {
                    case 'error':
                        AgoraRTC.Logger.error(message);
                        break;
                    case 'warning':
                        AgoraRTC.Logger.warning(message);
                        break;
                    case 'info':
                        AgoraRTC.Logger.info(message);
                        break;
                    case 'debug':
                        AgoraRTC.Logger.debug(message);
                        break;
                    default:
                        AgoraRTC.Logger.error(message);
                }
            };
        AngularAgoraRtcService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        AngularAgoraRtcService.ctorParameters = function () {
            return [
                { type: AgoraConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        /** @nocollapse */ AngularAgoraRtcService.ngInjectableDef = i0.defineInjectable({ factory: function AngularAgoraRtcService_Factory() { return new AngularAgoraRtcService(i0.inject("config")); }, token: AngularAgoraRtcService, providedIn: "root" });
        return AngularAgoraRtcService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AgoraLocalComponent = (function () {
        function AgoraLocalComponent(agoraService) {
            this.agoraService = agoraService;
            this.activeCall = false;
            this.audioEnabled = true;
            this.videoEnabled = true;
            this.remoteCalls = [];
            this.agoraService.createClient();
        }
        /**
         * @return {?}
         */
        AgoraLocalComponent.prototype.startCall = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.activeCall = true;
                this.agoraService.client.join(null, '1000', null, function (uid) {
                    _this.localStream = _this.agoraService.createStream(uid, true, null, null, true, false);
                    _this.localStream.setVideoProfile('720p_3');
                    _this.subscribeToStreams();
                });
            };
        /**
         * @return {?}
         */
        AgoraLocalComponent.prototype.subscribeToStreams = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.localStream.on("accessAllowed", function () {
                    console.log("accessAllowed");
                });
                // The user has denied access to the camera and mic.
                this.localStream.on("accessDenied", function () {
                    console.log("accessDenied");
                });
                this.localStream.init(function () {
                    console.log("getUserMedia successfully");
                    _this.localStream.play('agora_local');
                    _this.agoraService.client.publish(_this.localStream, function (err) {
                        console.log("Publish local stream error: " + err);
                    });
                    _this.agoraService.client.on('stream-published', function (evt) {
                        console.log("Publish local stream successfully");
                    });
                }, function (err) {
                    console.log("getUserMedia failed", err);
                });
                this.agoraService.client.on('error', function (err) {
                    console.log("Got error msg:", err.reason);
                    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                        _this.agoraService.client.renewChannelKey("", function () {
                            console.log("Renew channel key successfully");
                        }, function (err) {
                            console.log("Renew channel key failed: ", err);
                        });
                    }
                });
                this.agoraService.client.on('stream-added', function (evt) {
                    /** @type {?} */
                    var stream = evt.stream;
                    _this.agoraService.client.subscribe(stream, function (err) {
                        console.log("Subscribe stream failed", err);
                    });
                });
                this.agoraService.client.on('stream-subscribed', function (evt) {
                    /** @type {?} */
                    var stream = evt.stream;
                    if (!_this.remoteCalls.includes("agora_remote" + stream.getId()))
                        _this.remoteCalls.push("agora_remote" + stream.getId());
                    setTimeout(function () { return stream.play("agora_remote" + stream.getId()); }, 2000);
                });
                this.agoraService.client.on('stream-removed', function (evt) {
                    /** @type {?} */
                    var stream = evt.stream;
                    stream.stop();
                    _this.remoteCalls = _this.remoteCalls.filter(function (call) { return call !== "#agora_remote" + stream.getId(); });
                    console.log("Remote stream is removed " + stream.getId());
                });
                this.agoraService.client.on('peer-leave', function (evt) {
                    /** @type {?} */
                    var stream = evt.stream;
                    if (stream) {
                        stream.stop();
                        _this.remoteCalls = _this.remoteCalls.filter(function (call) { return call === "#agora_remote" + stream.getId(); });
                        console.log(evt.uid + " left from this channel");
                    }
                });
            };
        /**
         * @return {?}
         */
        AgoraLocalComponent.prototype.leave = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.agoraService.client.leave(function () {
                    _this.activeCall = false;
                    document.getElementById('agora_local').innerHTML = "";
                    console.log("Leavel channel successfully");
                }, function (err) {
                    console.log("Leave channel failed");
                });
            };
        /**
         * @return {?}
         */
        AgoraLocalComponent.prototype.toggleAudio = /**
         * @return {?}
         */
            function () {
                this.audioEnabled = !this.audioEnabled;
                if (this.audioEnabled)
                    this.localStream.enableAudio();
                else
                    this.localStream.disableAudio();
            };
        /**
         * @return {?}
         */
        AgoraLocalComponent.prototype.toggleVideo = /**
         * @return {?}
         */
            function () {
                this.videoEnabled = !this.videoEnabled;
                if (this.videoEnabled)
                    this.localStream.enableVideo();
                else
                    this.localStream.disableVideo();
            };
        AgoraLocalComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'agora-rtc',
                        template: "<div class=\"video-container\">\n\t<div class=\"call-container\">\n\t</div>\n\t<div class=\"agora_local\">\n\t\t<div class=\"video-buttons\">\n\t\t\t<i class=\"startCall material-icons\" (click)=\"startCall()\" *ngIf=\"!activeCall\">videocam</i>\n\t\t\t<ng-container *ngIf=\"activeCall\">\n\t\t\t\t<i class=\"endCall material-icons\" (click)=\"leave()\" *ngIf=\"activeCall\">phone</i>\n\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleAudio()\" *ngIf=\"audioEnabled\">mic</i>\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleAudio()\" *ngIf=\"!audioEnabled\">mic_off</i>\n\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleVideo()\" *ngIf=\"videoEnabled\">videocam</i>\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleVideo()\" *ngIf=\"!videoEnabled\">videocam_off</i>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<div id=\"agora_local\"></div>\n\t</div>\n\t<div class=\"agora_remote\" *ngFor=\"let remote of remoteCalls\" [id]=\"remote\">\n\n\t</div>\n</div>",
                        styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);p{font-family:Lato}.video-container{height:100vh;display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center}.agora_local{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}#agora_local{height:250px;width:250px;top:-28px}.agora_remote{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}.video-buttons{width:250px;top:210px;position:relative;text-align:center;z-index:999}.video-buttons i{cursor:pointer}.endCall{color:red}.mic,.startCall{color:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        AgoraLocalComponent.ctorParameters = function () {
            return [
                { type: AngularAgoraRtcService }
            ];
        };
        return AgoraLocalComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularAgoraRtcModule = (function () {
        function AngularAgoraRtcModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        AngularAgoraRtcModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: AngularAgoraRtcModule,
                    providers: [AngularAgoraRtcService, { provide: 'config', useValue: config }]
                };
            };
        AngularAgoraRtcModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [AgoraLocalComponent],
                        exports: [AgoraLocalComponent]
                    },] },
        ];
        return AngularAgoraRtcModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AgoraClient = (function () {
        function AgoraClient() {
        }
        return AgoraClient;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Stream = (function () {
        function Stream() {
        }
        return Stream;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Device = (function () {
        function Device() {
        }
        return Device;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.AngularAgoraRtcService = AngularAgoraRtcService;
    exports.AgoraLocalComponent = AgoraLocalComponent;
    exports.AngularAgoraRtcModule = AngularAgoraRtcModule;
    exports.AgoraClient = AgoraClient;
    exports.Stream = Stream;
    exports.Device = Device;
    exports.AgoraConfig = AgoraConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy9saWIvQWdvcmFDb25maWcudHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9hbmd1bGFyLWFnb3JhLXJ0Yy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy9saWIvYWdvcmEtbG9jYWwuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy9saWIvYW5ndWxhci1hZ29yYS1ydGMubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy9saWIvQWdvcmFDbGllbnQudHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9TdHJlYW0udHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9EZXZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFnb3JhQ29uZmlne1xuICAgIEFwcElEOnN0cmluZztcbn0iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEFnb3JhUlRDIGZyb20gJ2Fnb3JhLXJ0Yy1zZGsnO1xuaW1wb3J0IHsgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBZ29yYUNvbmZpZyB9IGZyb20gJy4vQWdvcmFDb25maWcnO1xuaW1wb3J0IHsgQWdvcmFDbGllbnQgfSBmcm9tICcuL0Fnb3JhQ2xpZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckFnb3JhUnRjU2VydmljZSB7XG5cbiAgcHVibGljIGF1ZGlvRGV2aWNlczogYW55W107XG4gIHB1YmxpYyB2aWRlb0RldmljZXM6IGFueVtdO1xuXG4gIHB1YmxpYyBjbGllbnQ6IEFnb3JhQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHByaXZhdGUgY29uZmlnOkFnb3JhQ29uZmlnXG4gICkge1xuICAgIGlmICghdGhpcy5jaGVja1N5c3RlbVJlcXVpcmVtZW50cygpKSB7XG4gICAgICB0aGlzLmxvZ2dlcignZXJyb3InLCAnV2ViIFJUQyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfSBlbHNle1xuICAgICAgdGhpcy5nZXREZXZpY2VzKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTeXN0ZW1SZXF1aXJlbWVudHMoKSB7XG4gICAgcmV0dXJuIEFnb3JhUlRDLmNoZWNrU3lzdGVtUmVxdWlyZW1lbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldERldmljZXMoKSB7XG4gICAgQWdvcmFSVEMuZ2V0RGV2aWNlcygoZGV2aWNlcykgPT4ge1xuICAgICAgbGV0IGF1ZGlvRGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZpY2Uua2luZCA9PT0gJ2F1ZGlvaW5wdXQnICYmIGRldmljZS5kZXZpY2VJZCAhPT0gJ2RlZmF1bHQnXG4gICAgICB9KTtcbiAgICAgIGxldCB2aWRlb0RldmljZXMgPSBkZXZpY2VzLmZpbHRlcihkZXZpY2UgPT4ge1xuICAgICAgICByZXR1cm4gZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyAmJiBkZXZpY2UuZGV2aWNlSWQgIT09ICdkZWZhdWx0J1xuICAgICAgfSk7XG4gICAgICB0aGlzLmF1ZGlvRGV2aWNlcyA9IGF1ZGlvRGV2aWNlcztcbiAgICAgIHRoaXMudmlkZW9EZXZpY2VzID0gdmlkZW9EZXZpY2VzO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQ2xpZW50KG1vZGU6IHN0cmluZyA9ICdpbnRlcm9wJykge1xuICAgICB0aGlzLmNsaWVudCA9IEFnb3JhUlRDLmNyZWF0ZUNsaWVudCh7IG1vZGU6IG1vZGUgfSk7XG4gICAgIHRoaXMuY2xpZW50LmluaXQodGhpcy5jb25maWcuQXBwSUQpO1xuICB9XG5cbiAgY3JlYXRlU3RyZWFtKHN0cmVhbUlEOiBhbnksIGF1ZGlvOiBib29sZWFuLCBjYW1lcmFJZDogc3RyaW5nID0gdGhpcy52aWRlb0RldmljZXNbMF0uZGV2aWNlSWQsIG1pY3JvcGhvbmVJZDogc3RyaW5nID0gdGhpcy5hdWRpb0RldmljZXNbMF0uZGV2aWNlSWQsIHZpZGVvOiBib29sZWFuLCBzY3JlZW46IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gQWdvcmFSVEMuY3JlYXRlU3RyZWFtKHtzdHJlYW1JRCwgYXVkaW8sIGNhbWVyYUlkLCBtaWNyb3Bob25lSWQsIHZpZGVvLCBzY3JlZW59KTtcbiAgfVxuXG4gIGxvZ2dlcih0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci53YXJuaW5nKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuaW5mbyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWJ1Zyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJBZ29yYVJ0Y1NlcnZpY2UgfSBmcm9tICcuL2FuZ3VsYXItYWdvcmEtcnRjLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtIH0gZnJvbSAnLi9TdHJlYW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZ29yYS1ydGMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWRlby1jb250YWluZXJcIj5cblx0PGRpdiBjbGFzcz1cImNhbGwtY29udGFpbmVyXCI+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYWdvcmFfbG9jYWxcIj5cblx0XHQ8ZGl2IGNsYXNzPVwidmlkZW8tYnV0dG9uc1wiPlxuXHRcdFx0PGkgY2xhc3M9XCJzdGFydENhbGwgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwic3RhcnRDYWxsKClcIiAqbmdJZj1cIiFhY3RpdmVDYWxsXCI+dmlkZW9jYW08L2k+XG5cdFx0XHQ8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aXZlQ2FsbFwiPlxuXHRcdFx0XHQ8aSBjbGFzcz1cImVuZENhbGwgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwibGVhdmUoKVwiICpuZ0lmPVwiYWN0aXZlQ2FsbFwiPnBob25lPC9pPlxuXG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZUF1ZGlvKClcIiAqbmdJZj1cImF1ZGlvRW5hYmxlZFwiPm1pYzwvaT5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiICpuZ0lmPVwiIWF1ZGlvRW5hYmxlZFwiPm1pY19vZmY8L2k+XG5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlVmlkZW8oKVwiICpuZ0lmPVwidmlkZW9FbmFibGVkXCI+dmlkZW9jYW08L2k+XG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZVZpZGVvKClcIiAqbmdJZj1cIiF2aWRlb0VuYWJsZWRcIj52aWRlb2NhbV9vZmY8L2k+XG5cdFx0XHQ8L25nLWNvbnRhaW5lcj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGlkPVwiYWdvcmFfbG9jYWxcIj48L2Rpdj5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJhZ29yYV9yZW1vdGVcIiAqbmdGb3I9XCJsZXQgcmVtb3RlIG9mIHJlbW90ZUNhbGxzXCIgW2lkXT1cInJlbW90ZVwiPlxuXG5cdDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpO3B7Zm9udC1mYW1pbHk6TGF0b30udmlkZW8tY29udGFpbmVye2hlaWdodDoxMDB2aDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFnb3JhX2xvY2Fse2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtoZWlnaHQ6MjUwcHg7d2lkdGg6MjUwcHg7Ym9yZGVyOjFweCBzb2xpZCAjMDAwO21hcmdpbjo4cHh9I2Fnb3JhX2xvY2Fse2hlaWdodDoyNTBweDt3aWR0aDoyNTBweDt0b3A6LTI4cHh9LmFnb3JhX3JlbW90ZXtiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7aGVpZ2h0OjI1MHB4O3dpZHRoOjI1MHB4O2JvcmRlcjoxcHggc29saWQgIzAwMDttYXJnaW46OHB4fS52aWRlby1idXR0b25ze3dpZHRoOjI1MHB4O3RvcDoyMTBweDtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OX0udmlkZW8tYnV0dG9ucyBpe2N1cnNvcjpwb2ludGVyfS5lbmRDYWxse2NvbG9yOnJlZH0ubWljLC5zdGFydENhbGx7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBBZ29yYUxvY2FsQ29tcG9uZW50IHtcblxuICBhY3RpdmVDYWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGF1ZGlvRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIHZpZGVvRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGxvY2FsU3RyZWFtOiBTdHJlYW1cbiAgcmVtb3RlQ2FsbHM6IGFueSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWdvcmFTZXJ2aWNlOiBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNyZWF0ZUNsaWVudCgpO1xuICB9XG5cbiAgc3RhcnRDYWxsKCkge1xuICAgIHRoaXMuYWN0aXZlQ2FsbCA9IHRydWU7XG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LmpvaW4obnVsbCwgJzEwMDAnLCBudWxsLCAodWlkKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtID0gdGhpcy5hZ29yYVNlcnZpY2UuY3JlYXRlU3RyZWFtKHVpZCwgdHJ1ZSwgbnVsbCwgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbS5zZXRWaWRlb1Byb2ZpbGUoJzcyMHBfMycpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb1N0cmVhbXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TdHJlYW1zKCkge1xuICAgIHRoaXMubG9jYWxTdHJlYW0ub24oXCJhY2Nlc3NBbGxvd2VkXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXNzQWxsb3dlZFwiKTtcbiAgICB9KTtcbiAgICAvLyBUaGUgdXNlciBoYXMgZGVuaWVkIGFjY2VzcyB0byB0aGUgY2FtZXJhIGFuZCBtaWMuXG4gICAgdGhpcy5sb2NhbFN0cmVhbS5vbihcImFjY2Vzc0RlbmllZFwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImFjY2Vzc0RlbmllZFwiKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9jYWxTdHJlYW0uaW5pdCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImdldFVzZXJNZWRpYSBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtLnBsYXkoJ2Fnb3JhX2xvY2FsJyk7XG4gICAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQucHVibGlzaCh0aGlzLmxvY2FsU3RyZWFtLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHVibGlzaCBsb2NhbCBzdHJlYW0gZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tcHVibGlzaGVkJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlB1Ymxpc2ggbG9jYWwgc3RyZWFtIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VXNlck1lZGlhIGZhaWxlZFwiLCBlcnIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiR290IGVycm9yIG1zZzpcIiwgZXJyLnJlYXNvbik7XG4gICAgICBpZiAoZXJyLnJlYXNvbiA9PT0gJ0RZTkFNSUNfS0VZX1RJTUVPVVQnKSB7XG4gICAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5yZW5ld0NoYW5uZWxLZXkoXCJcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVuZXcgY2hhbm5lbCBrZXkgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW5ldyBjaGFubmVsIGtleSBmYWlsZWQ6IFwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignc3RyZWFtLWFkZGVkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5zdWJzY3JpYmUoc3RyZWFtLCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJlIHN0cmVhbSBmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tc3Vic2NyaWJlZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICBpZiAoIXRoaXMucmVtb3RlQ2FsbHMuaW5jbHVkZXMoYGFnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCkpIHRoaXMucmVtb3RlQ2FsbHMucHVzaChgYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLnBsYXkoYGFnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCksIDIwMDApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tcmVtb3ZlZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgdGhpcy5yZW1vdGVDYWxscyA9IHRoaXMucmVtb3RlQ2FsbHMuZmlsdGVyKGNhbGwgPT4gY2FsbCAhPT0gYCNhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgICAgY29uc29sZS5sb2coYFJlbW90ZSBzdHJlYW0gaXMgcmVtb3ZlZCAke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdwZWVyLWxlYXZlJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yZW1vdGVDYWxscyA9IHRoaXMucmVtb3RlQ2FsbHMuZmlsdGVyKGNhbGwgPT4gY2FsbCA9PT0gYCNhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtldnQudWlkfSBsZWZ0IGZyb20gdGhpcyBjaGFubmVsYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbGVhdmUoKSB7XG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LmxlYXZlKCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlQ2FsbCA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fnb3JhX2xvY2FsJykuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiTGVhdmVsIGNoYW5uZWwgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTGVhdmUgY2hhbm5lbCBmYWlsZWRcIik7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvRW5hYmxlZCA9ICF0aGlzLmF1ZGlvRW5hYmxlZDtcbiAgICBpZiAodGhpcy5hdWRpb0VuYWJsZWQpIHRoaXMubG9jYWxTdHJlYW0uZW5hYmxlQXVkaW8oKTtcbiAgICBlbHNlIHRoaXMubG9jYWxTdHJlYW0uZGlzYWJsZUF1ZGlvKCk7XG4gIH1cblxuICB0b2dnbGVWaWRlbygpIHtcbiAgICB0aGlzLnZpZGVvRW5hYmxlZCA9ICF0aGlzLnZpZGVvRW5hYmxlZDtcbiAgICBpZiAodGhpcy52aWRlb0VuYWJsZWQpIHRoaXMubG9jYWxTdHJlYW0uZW5hYmxlVmlkZW8oKTtcbiAgICBlbHNlIHRoaXMubG9jYWxTdHJlYW0uZGlzYWJsZVZpZGVvKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnb3JhTG9jYWxDb21wb25lbnQgfSBmcm9tICcuL2Fnb3JhLWxvY2FsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZ29yYUNvbmZpZyB9IGZyb20gJy4vQWdvcmFDb25maWcnO1xuaW1wb3J0IHsgQW5ndWxhckFnb3JhUnRjU2VydmljZSB9IGZyb20gJy4vYW5ndWxhci1hZ29yYS1ydGMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Fnb3JhTG9jYWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWdvcmFMb2NhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckFnb3JhUnRjTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBBZ29yYUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnN7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBbmd1bGFyQWdvcmFSdGNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlLCB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWd9XVxuICAgIH07XG4gIH1cbiB9XG4iLCJleHBvcnQgY2xhc3MgQWdvcmFDbGllbnQge1xuICAgIGFlc01vZGU6IHN0cmluZztcbiAgICBhZXNwYXNzd29yZDogc3RyaW5nO1xuICAgIGNvbmZpZ1B1Ymxpc2hlcjogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc2FibGVEdWFsU3RyZWFtOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZW5hYmxlRHVhbFN0cmVhbTogYW55OyAvLyBmdW5jdGlvblxuICAgIGdhdGV3YXlDbGllbnQ6IHt9OyAvLyBhZGQgb2JqZWN0XG4gICAgaGlnaFN0cmVhbTogYW55OyAvLyA/IHR5cGVcbiAgICBoaWdoU3RyZWFtU3RhdGU6IG51bWJlcjtcbiAgICBpbml0OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaXNEdWFsU3RyZWFtOiBib29sZWFuO1xuICAgIGpvaW46IGFueTsgLy8gZnVuY3Rpb25cbiAgICBrZXk6IGFueTsgLy8gPyBzdHJpbmdcbiAgICBsZWF2ZTogYW55OyAvLyBmdW5jdGlvblxuICAgIGxvd1N0cmVhbTogYW55OyAvLyA/XG4gICAgbG93U3RyZWFtUGFyYW1ldGVyOiBhbnkgLy8gP1xuICAgIGxvd1N0cmVhbVN0YXRlOiBudW1iZXI7XG4gICAgb246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBwcm94eVNlcnZlcjogYW55OyAvLyA/XG4gICAgcHVibGlzaDogYW55OyAvLyBmdW5jdGlvblxuICAgIHJlbmV3Q2hhbm5lbEtleTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldEVuY3J5cHRpb25Nb2RlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0RW5jcnlwdGlvblNlY3JldDogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldExpdmVUcmFuc2NvZGluZzogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldExvd1N0cmVhbVBhcmFtZXRlcjogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFByb3h5U2VydmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0UmVtb3RlVmlkZW9TdHJlYW1UeXBlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VHVyblNlcnZlcjogYW55OyAvLyBmdW5jdGlvblxuICAgIHN0YXJ0TGl2ZVN0cmVhbWluZzogYW55OyAvLyBmdW5jdGlvblxuICAgIHN0b3BMaXZlU3RyZWFtaW5nOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3Vic2NyaWJlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgdHVyblNlcnZlcjogYW55OyAvLyBmdW5jdGlvblxuICAgIHVucHVibGlzaDogYW55OyAvLyBmdW5jdGlvblxuICAgIHVuc3Vic2NyaWJlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gIH0iLCJleHBvcnQgY2xhc3MgU3RyZWFtIHtcbiAgICBhZGRFdmVudExpc3RlbmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgYXVkaW86IGJvb2xlYW47XG4gICAgYXVkaW9FbmFibGVkOiBib29sZWFuO1xuICAgIGF1ZGlvTGV2ZWxIZWxwZXI6IGFueSAvLyA/XG4gICAgYXV4X3N0cmVhbTogYW55OyAvLyA/XG4gICAgY2xvc2U6IGFueTsgLy8gZnVuY3Rpb24gXG4gICAgZGlzYWJsZUF1ZGlvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzYWJsZVZpZGVvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzcGF0Y2hFdmVudDogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc3BhdGNoU29ja2V0RXZlbnQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNwYXRjaGVyOiBhbnk7IC8vIGV2ZW50IGxpc3RlbmVyXG4gICAgZW5hYmxlQXVkaW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBlbmFibGVWaWRlbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGdldEF0dHJpYnV0ZXM6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRBdWRpb0xldmVsOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2V0SWQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRTdGF0czogYW55OyAvLyBmdW5jdGlvblxuICAgIGhhc0F1ZGlvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaGFzU2NyZWVuOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaGFzVmlkZW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpbml0OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgaXNBdWRpb09uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaXNWaWRlb09uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgbG9jYWw6IGJvb2xlYW47XG4gICAgbG93U3RyZWFtOiBhbnk7IC8vP1xuICAgIG1pcnJvcjogYm9vbGVhbjtcbiAgICBtdXRlQXVkaW86IGFueTsgLy8gP1xuICAgIG11dGVWaWRlbzogYW55OyAvLyA/XG4gICAgb246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBvbkNsb3NlOiBhbnkgLy8gP1xuICAgIHBhcmFtczpcbiAgICAgICAgeyBzdHJlYW1JRDogbnVtYmVyLCBhdWRpbzogYm9vbGVhbiwgY2FtZXJhSWQ6IHN0cmluZywgbWljcm9waG9uZUlkOiBzdHJpbmcsIHZpZGVvOiBib29sZWFuIH1cbiAgICBwbGF5OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgcGxheWVyOiBhbnk7IC8vID9cbiAgICByZW1vdmVFdmVudExpc3RlbmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2NyZWVuOiBib29sZWFuO1xuICAgIHNjcmVlbkF0dHJpYnV0ZXM6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG1heEZyOiBudW1iZXIsIG1pbkZyOiBudW1iZXIgfVxuICAgIHNldFNjcmVlblByb2ZpbGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb0JpdFJhdGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb0ZyYW1lUmF0ZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZUN1c3RvbTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZUN1c3RvbVBsdXM6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb1Jlc29sdXRpb246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdG9wOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RyZWFtTGFueWwgLy8gP1xuICAgIHN0cmVhbUlkOiBudW1iZXI7XG4gICAgdW5tdXRlQXVkaW86IGFueTsgLy8gP1xuICAgIHVubXV0ZVZpZGVvOiBhbnk7IC8vID9cbiAgICB1cmw6IGFueTsgLy8/XG4gICAgdmlkZW86IGJvb2xlYW47XG4gICAgdmlkZW9FbmFibGVkOiBib29sZWFuO1xuICAgIHZpZGVvSGVpZ2h0OiBudW1iZXI7XG4gICAgdmlkZW9TaXplOiBBcnJheTxudW1iZXI+XG4gICAgdmlkZW9XaWR0aDogbnVtYmVyO1xufSIsImV4cG9ydCBjbGFzcyBEZXZpY2Uge1xuICAgIGRldmljZUlkOnN0cmluZztcbiAgICBncm91cElkOnN0cmluZztcbiAgICBraW5kOnN0cmluZztcbiAgICBsYWJlbDpzdHJpbmc7XG59Il0sIm5hbWVzIjpbIkFnb3JhUlRDLmNoZWNrU3lzdGVtUmVxdWlyZW1lbnRzIiwiQWdvcmFSVEMuZ2V0RGV2aWNlcyIsIkFnb3JhUlRDLmNyZWF0ZUNsaWVudCIsIkFnb3JhUlRDLmNyZWF0ZVN0cmVhbSIsIkFnb3JhUlRDLkxvZ2dlciIsIkluamVjdGFibGUiLCJJbmplY3QiLCJDb21wb25lbnQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQUE7OzswQkFBQTtRQUVDOzs7Ozs7QUNGRDtRQWdCRSxnQ0FDNEIsTUFBa0I7WUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtZQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7YUFDbEQ7aUJBQUs7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1NBQ0Y7Ozs7UUFFRCx3REFBdUI7OztZQUF2QjtnQkFDRSxPQUFPQSxnQ0FBZ0MsRUFBRSxDQUFDO2FBQzNDOzs7O1FBRU8sMkNBQVU7Ozs7O2dCQUNoQkMsbUJBQW1CLENBQUMsVUFBQyxPQUFPOztvQkFDMUIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU07d0JBQ3RDLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUE7cUJBQ3JFLENBQUMsQ0FBQzs7b0JBQ0gsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU07d0JBQ3RDLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLFFB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