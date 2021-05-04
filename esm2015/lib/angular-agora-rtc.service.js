/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import * as AgoraRTC from 'agora-rtc-sdk';
import { AgoraConfig } from './AgoraConfig';
import * as i0 from "@angular/core";
export class AngularAgoraRtcService {
    /**
     * @param {?} config
     */
    constructor(config) {
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
    checkSystemRequirements() {
        return AgoraRTC.checkSystemRequirements();
    }
    /**
     * @return {?}
     */
    getDevices() {
        AgoraRTC.getDevices((devices) => {
            /** @type {?} */
            let audioDevices = devices.filter(device => {
                return device.kind === 'audioinput' && device.deviceId !== 'default';
            });
            /** @type {?} */
            let videoDevices = devices.filter(device => {
                return device.kind === 'videoinput' && device.deviceId !== 'default';
            });
            this.audioDevices = audioDevices;
            this.videoDevices = videoDevices;
        });
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    createClient(mode = 'interop') {
        this.client = AgoraRTC.createClient({ mode: mode });
        this.client.init(this.config.AppID);
    }
    /**
     * @param {?} streamID
     * @param {?} audio
     * @param {?=} cameraId
     * @param {?=} microphoneId
     * @param {?=} video
     * @param {?=} screen
     * @return {?}
     */
    createStream(streamID, audio, cameraId = this.videoDevices[0].deviceId, microphoneId = this.audioDevices[0].deviceId, video, screen) {
        return AgoraRTC.createStream({ streamID, audio, cameraId, microphoneId, video, screen });
    }
    /**
     * @param {?} type
     * @param {?} message
     * @return {?}
     */
    logger(type, message) {
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
    }
}
AngularAgoraRtcService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
AngularAgoraRtcService.ctorParameters = () => [
    { type: AgoraConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
/** @nocollapse */ AngularAgoraRtcService.ngInjectableDef = i0.defineInjectable({ factory: function AngularAgoraRtcService_Factory() { return new AngularAgoraRtcService(i0.inject("config")); }, token: AngularAgoraRtcService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYWdvcmEtcnRjLyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItYWdvcmEtcnRjLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTVDLE1BQU07Ozs7SUFPSixZQUM0QixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7U0FDbEQ7UUFBQyxJQUFJLENBQUEsQ0FBQztZQUNMLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtLQUNGOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztLQUMzQzs7OztJQUVPLFVBQVU7UUFDaEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztZQUM5QixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUE7YUFDckUsQ0FBQyxDQUFDOztZQUNILElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQTthQUNyRSxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUNsQyxDQUFDLENBQUM7Ozs7OztJQUdMLFlBQVksQ0FBQyxPQUFlLFNBQVM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7Ozs7OztJQUVELFlBQVksQ0FBQyxRQUFhLEVBQUUsS0FBYyxFQUFFLFdBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLGVBQXVCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQWMsRUFBRSxNQUFlO1FBQ2pMLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0tBQ3hGOzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLE9BQWU7UUFDbEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLENBQUM7WUFDUixLQUFLLE1BQU07Z0JBQ1QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLEtBQUssQ0FBQztZQUNSLEtBQUssT0FBTztnQkFDVixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEM7S0FDRjs7O1lBL0RGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUxRLFdBQVcsdUJBY2YsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEFnb3JhUlRDIGZyb20gJ2Fnb3JhLXJ0Yy1zZGsnO1xuaW1wb3J0IHsgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBZ29yYUNvbmZpZyB9IGZyb20gJy4vQWdvcmFDb25maWcnO1xuaW1wb3J0IHsgQWdvcmFDbGllbnQgfSBmcm9tICcuL0Fnb3JhQ2xpZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckFnb3JhUnRjU2VydmljZSB7XG5cbiAgcHVibGljIGF1ZGlvRGV2aWNlczogYW55W107XG4gIHB1YmxpYyB2aWRlb0RldmljZXM6IGFueVtdO1xuXG4gIHB1YmxpYyBjbGllbnQ6IEFnb3JhQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHByaXZhdGUgY29uZmlnOkFnb3JhQ29uZmlnXG4gICkge1xuICAgIGlmICghdGhpcy5jaGVja1N5c3RlbVJlcXVpcmVtZW50cygpKSB7XG4gICAgICB0aGlzLmxvZ2dlcignZXJyb3InLCAnV2ViIFJUQyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfSBlbHNle1xuICAgICAgdGhpcy5nZXREZXZpY2VzKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTeXN0ZW1SZXF1aXJlbWVudHMoKSB7XG4gICAgcmV0dXJuIEFnb3JhUlRDLmNoZWNrU3lzdGVtUmVxdWlyZW1lbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldERldmljZXMoKSB7XG4gICAgQWdvcmFSVEMuZ2V0RGV2aWNlcygoZGV2aWNlcykgPT4ge1xuICAgICAgbGV0IGF1ZGlvRGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZpY2Uua2luZCA9PT0gJ2F1ZGlvaW5wdXQnICYmIGRldmljZS5kZXZpY2VJZCAhPT0gJ2RlZmF1bHQnXG4gICAgICB9KTtcbiAgICAgIGxldCB2aWRlb0RldmljZXMgPSBkZXZpY2VzLmZpbHRlcihkZXZpY2UgPT4ge1xuICAgICAgICByZXR1cm4gZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyAmJiBkZXZpY2UuZGV2aWNlSWQgIT09ICdkZWZhdWx0J1xuICAgICAgfSk7XG4gICAgICB0aGlzLmF1ZGlvRGV2aWNlcyA9IGF1ZGlvRGV2aWNlcztcbiAgICAgIHRoaXMudmlkZW9EZXZpY2VzID0gdmlkZW9EZXZpY2VzO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQ2xpZW50KG1vZGU6IHN0cmluZyA9ICdpbnRlcm9wJykge1xuICAgICB0aGlzLmNsaWVudCA9IEFnb3JhUlRDLmNyZWF0ZUNsaWVudCh7IG1vZGU6IG1vZGUgfSk7XG4gICAgIHRoaXMuY2xpZW50LmluaXQodGhpcy5jb25maWcuQXBwSUQpO1xuICB9XG5cbiAgY3JlYXRlU3RyZWFtKHN0cmVhbUlEOiBhbnksIGF1ZGlvOiBib29sZWFuLCBjYW1lcmFJZDogc3RyaW5nID0gdGhpcy52aWRlb0RldmljZXNbMF0uZGV2aWNlSWQsIG1pY3JvcGhvbmVJZDogc3RyaW5nID0gdGhpcy5hdWRpb0RldmljZXNbMF0uZGV2aWNlSWQsIHZpZGVvOiBib29sZWFuLCBzY3JlZW46IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gQWdvcmFSVEMuY3JlYXRlU3RyZWFtKHtzdHJlYW1JRCwgYXVkaW8sIGNhbWVyYUlkLCBtaWNyb3Bob25lSWQsIHZpZGVvLCBzY3JlZW59KTtcbiAgfVxuXG4gIGxvZ2dlcih0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci53YXJuaW5nKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuaW5mbyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWJ1Zyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBBZ29yYVJUQy5Mb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=