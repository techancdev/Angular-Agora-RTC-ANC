/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import * as AgoraRTC from 'agora-rtc-sdk';
import { AgoraConfig } from './AgoraConfig';
import * as i0 from "@angular/core";
var AngularAgoraRtcService = /** @class */ (function () {
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
        if (mode === void 0) { mode = 'interop'; }
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
        if (cameraId === void 0) { cameraId = this.videoDevices[0].deviceId; }
        if (microphoneId === void 0) { microphoneId = this.audioDevices[0].deviceId; }
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    AngularAgoraRtcService.ctorParameters = function () { return [
        { type: AgoraConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    /** @nocollapse */ AngularAgoraRtcService.ngInjectableDef = i0.defineInjectable({ factory: function AngularAgoraRtcService_Factory() { return new AngularAgoraRtcService(i0.inject("config")); }, token: AngularAgoraRtcService, providedIn: "root" });
    return AngularAgoraRtcService;
}());
export { AngularAgoraRtcService };
function AngularAgoraRtcService_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularAgoraRtcService.prototype.audioDevices;
    /** @type {?} */
    AngularAgoraRtcService.prototype.videoDevices;
    /** @type {?} */
    AngularAgoraRtcService.prototype.client;
    /** @type {?} */
    AngularAgoraRtcService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYWdvcmEtcnRjLyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItYWdvcmEtcnRjLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQWExQyxnQ0FDNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUU1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsSUFBSSxDQUFBLENBQUM7WUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7S0FDRjs7OztJQUVELHdEQUF1Qjs7O0lBQXZCO1FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0tBQzNDOzs7O0lBRU8sMkNBQVU7Ozs7O1FBQ2hCLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBQyxPQUFPOztZQUMxQixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFBO2FBQ3JFLENBQUMsQ0FBQzs7WUFDSCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFBO2FBQ3JFLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ2xDLENBQUMsQ0FBQzs7Ozs7O0lBR0wsNkNBQVk7Ozs7SUFBWixVQUFhLElBQXdCO1FBQXhCLHFCQUFBLEVBQUEsZ0JBQXdCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7Ozs7Ozs7SUFFRCw2Q0FBWTs7Ozs7Ozs7O0lBQVosVUFBYSxRQUFhLEVBQUUsS0FBYyxFQUFFLFFBQWdELEVBQUUsWUFBb0QsRUFBRSxLQUFjLEVBQUUsTUFBZTtRQUF2SSx5QkFBQSxFQUFBLFdBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUFFLDZCQUFBLEVBQUEsZUFBdUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ2hKLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUMsUUFBUSxVQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDO0tBQ3hGOzs7Ozs7SUFFRCx1Q0FBTTs7Ozs7SUFBTixVQUFPLElBQVksRUFBRSxPQUFlO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLE9BQU87Z0JBQ1YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNSLEtBQUssU0FBUztnQkFDWixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDO1lBQ1IsS0FBSyxNQUFNO2dCQUNULFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUM7WUFDUixLQUFLLE9BQU87Z0JBQ1YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNSO2dCQUNFLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7O2dCQS9ERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLFdBQVcsdUJBY2YsTUFBTSxTQUFDLFFBQVE7OztpQ0FqQnBCOztTQVNhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQWdvcmFSVEMgZnJvbSAnYWdvcmEtcnRjLXNkayc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFnb3JhQ29uZmlnIH0gZnJvbSAnLi9BZ29yYUNvbmZpZyc7XG5pbXBvcnQgeyBBZ29yYUNsaWVudCB9IGZyb20gJy4vQWdvcmFDbGllbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlIHtcblxuICBwdWJsaWMgYXVkaW9EZXZpY2VzOiBhbnlbXTtcbiAgcHVibGljIHZpZGVvRGV2aWNlczogYW55W107XG5cbiAgcHVibGljIGNsaWVudDogQWdvcmFDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBjb25maWc6QWdvcmFDb25maWdcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrU3lzdGVtUmVxdWlyZW1lbnRzKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyKCdlcnJvcicsICdXZWIgUlRDIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9IGVsc2V7XG4gICAgICB0aGlzLmdldERldmljZXMoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1N5c3RlbVJlcXVpcmVtZW50cygpIHtcbiAgICByZXR1cm4gQWdvcmFSVEMuY2hlY2tTeXN0ZW1SZXF1aXJlbWVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGV2aWNlcygpIHtcbiAgICBBZ29yYVJUQy5nZXREZXZpY2VzKChkZXZpY2VzKSA9PiB7XG4gICAgICBsZXQgYXVkaW9EZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZGV2aWNlID0+IHtcbiAgICAgICAgcmV0dXJuIGRldmljZS5raW5kID09PSAnYXVkaW9pbnB1dCcgJiYgZGV2aWNlLmRldmljZUlkICE9PSAnZGVmYXVsdCdcbiAgICAgIH0pO1xuICAgICAgbGV0IHZpZGVvRGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnICYmIGRldmljZS5kZXZpY2VJZCAhPT0gJ2RlZmF1bHQnXG4gICAgICB9KTtcbiAgICAgIHRoaXMuYXVkaW9EZXZpY2VzID0gYXVkaW9EZXZpY2VzO1xuICAgICAgdGhpcy52aWRlb0RldmljZXMgPSB2aWRlb0RldmljZXM7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVDbGllbnQobW9kZTogc3RyaW5nID0gJ2ludGVyb3AnKSB7XG4gICAgIHRoaXMuY2xpZW50ID0gQWdvcmFSVEMuY3JlYXRlQ2xpZW50KHsgbW9kZTogbW9kZSB9KTtcbiAgICAgdGhpcy5jbGllbnQuaW5pdCh0aGlzLmNvbmZpZy5BcHBJRCk7XG4gIH1cblxuICBjcmVhdGVTdHJlYW0oc3RyZWFtSUQ6IGFueSwgYXVkaW86IGJvb2xlYW4sIGNhbWVyYUlkOiBzdHJpbmcgPSB0aGlzLnZpZGVvRGV2aWNlc1swXS5kZXZpY2VJZCwgbWljcm9waG9uZUlkOiBzdHJpbmcgPSB0aGlzLmF1ZGlvRGV2aWNlc1swXS5kZXZpY2VJZCwgdmlkZW86IGJvb2xlYW4sIHNjcmVlbjogYm9vbGVhbikge1xuICAgIHJldHVybiBBZ29yYVJUQy5jcmVhdGVTdHJlYW0oe3N0cmVhbUlELCBhdWRpbywgY2FtZXJhSWQsIG1pY3JvcGhvbmVJZCwgdmlkZW8sIHNjcmVlbn0pO1xuICB9XG5cbiAgbG9nZ2VyKHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgQWdvcmFSVEMuTG9nZ2VyLndhcm5pbmcobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RlYnVnJzpcbiAgICAgICAgQWdvcmFSVEMuTG9nZ2VyLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==