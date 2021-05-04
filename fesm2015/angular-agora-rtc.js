import { Injectable, Inject, NgModule, Component, defineInjectable, inject } from '@angular/core';
import { checkSystemRequirements, getDevices, createClient, createStream, Logger } from 'agora-rtc-sdk';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AgoraConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularAgoraRtcService {
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
        return checkSystemRequirements();
    }
    /**
     * @return {?}
     */
    getDevices() {
        getDevices((devices) => {
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
        this.client = createClient({ mode: mode });
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
        return createStream({ streamID, audio, cameraId, microphoneId, video, screen });
    }
    /**
     * @param {?} type
     * @param {?} message
     * @return {?}
     */
    logger(type, message) {
        switch (type) {
            case 'error':
                Logger.error(message);
                break;
            case 'warning':
                Logger.warning(message);
                break;
            case 'info':
                Logger.info(message);
                break;
            case 'debug':
                Logger.debug(message);
                break;
            default:
                Logger.error(message);
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
/** @nocollapse */ AngularAgoraRtcService.ngInjectableDef = defineInjectable({ factory: function AngularAgoraRtcService_Factory() { return new AngularAgoraRtcService(inject("config")); }, token: AngularAgoraRtcService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AgoraLocalComponent {
    /**
     * @param {?} agoraService
     */
    constructor(agoraService) {
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
    startCall() {
        this.activeCall = true;
        this.agoraService.client.join(null, '1000', null, (uid) => {
            this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
            this.localStream.setVideoProfile('720p_3');
            this.subscribeToStreams();
        });
    }
    /**
     * @return {?}
     */
    subscribeToStreams() {
        this.localStream.on("accessAllowed", () => {
            console.log("accessAllowed");
        });
        // The user has denied access to the camera and mic.
        this.localStream.on("accessDenied", () => {
            console.log("accessDenied");
        });
        this.localStream.init(() => {
            console.log("getUserMedia successfully");
            this.localStream.play('agora_local');
            this.agoraService.client.publish(this.localStream, function (err) {
                console.log("Publish local stream error: " + err);
            });
            this.agoraService.client.on('stream-published', function (evt) {
                console.log("Publish local stream successfully");
            });
        }, function (err) {
            console.log("getUserMedia failed", err);
        });
        this.agoraService.client.on('error', (err) => {
            console.log("Got error msg:", err.reason);
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.agoraService.client.renewChannelKey("", () => {
                    console.log("Renew channel key successfully");
                }, (err) => {
                    console.log("Renew channel key failed: ", err);
                });
            }
        });
        this.agoraService.client.on('stream-added', (evt) => {
            /** @type {?} */
            const stream = evt.stream;
            this.agoraService.client.subscribe(stream, (err) => {
                console.log("Subscribe stream failed", err);
            });
        });
        this.agoraService.client.on('stream-subscribed', (evt) => {
            /** @type {?} */
            const stream = evt.stream;
            if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`))
                this.remoteCalls.push(`agora_remote${stream.getId()}`);
            setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
        });
        this.agoraService.client.on('stream-removed', (evt) => {
            /** @type {?} */
            const stream = evt.stream;
            stream.stop();
            this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
            console.log(`Remote stream is removed ${stream.getId()}`);
        });
        this.agoraService.client.on('peer-leave', (evt) => {
            /** @type {?} */
            const stream = evt.stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
                console.log(`${evt.uid} left from this channel`);
            }
        });
    }
    /**
     * @return {?}
     */
    leave() {
        this.agoraService.client.leave(() => {
            this.activeCall = false;
            document.getElementById('agora_local').innerHTML = "";
            console.log("Leavel channel successfully");
        }, (err) => {
            console.log("Leave channel failed");
        });
    }
    /**
     * @return {?}
     */
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        if (this.audioEnabled)
            this.localStream.enableAudio();
        else
            this.localStream.disableAudio();
    }
    /**
     * @return {?}
     */
    toggleVideo() {
        this.videoEnabled = !this.videoEnabled;
        if (this.videoEnabled)
            this.localStream.enableVideo();
        else
            this.localStream.disableVideo();
    }
}
AgoraLocalComponent.decorators = [
    { type: Component, args: [{
                selector: 'agora-rtc',
                template: `<div class="video-container">
	<div class="call-container">
	</div>
	<div class="agora_local">
		<div class="video-buttons">
			<i class="startCall material-icons" (click)="startCall()" *ngIf="!activeCall">videocam</i>
			<ng-container *ngIf="activeCall">
				<i class="endCall material-icons" (click)="leave()" *ngIf="activeCall">phone</i>

				<i class="mic material-icons" (click)="toggleAudio()" *ngIf="audioEnabled">mic</i>
				<i class="mic material-icons" (click)="toggleAudio()" *ngIf="!audioEnabled">mic_off</i>

				<i class="mic material-icons" (click)="toggleVideo()" *ngIf="videoEnabled">videocam</i>
				<i class="mic material-icons" (click)="toggleVideo()" *ngIf="!videoEnabled">videocam_off</i>
			</ng-container>
		</div>
		<div id="agora_local"></div>
	</div>
	<div class="agora_remote" *ngFor="let remote of remoteCalls" [id]="remote">

	</div>
</div>`,
                styles: [`@import url(https://fonts.googleapis.com/icon?family=Material+Icons);p{font-family:Lato}.video-container{height:100vh;display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center}.agora_local{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}#agora_local{height:250px;width:250px;top:-28px}.agora_remote{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}.video-buttons{width:250px;top:210px;position:relative;text-align:center;z-index:999}.video-buttons i{cursor:pointer}.endCall{color:red}.mic,.startCall{color:#fff}`]
            },] },
];
/** @nocollapse */
AgoraLocalComponent.ctorParameters = () => [
    { type: AngularAgoraRtcService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularAgoraRtcModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: AngularAgoraRtcModule,
            providers: [AngularAgoraRtcService, { provide: 'config', useValue: config }]
        };
    }
}
AngularAgoraRtcModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AgoraLocalComponent],
                exports: [AgoraLocalComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AgoraClient {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Stream {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Device {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularAgoraRtcService, AgoraLocalComponent, AngularAgoraRtcModule, AgoraClient, Stream, Device, AgoraConfig };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9BZ29yYUNvbmZpZy50cyIsIm5nOi8vYW5ndWxhci1hZ29yYS1ydGMvbGliL2FuZ3VsYXItYWdvcmEtcnRjLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9hZ29yYS1sb2NhbC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9hbmd1bGFyLWFnb3JhLXJ0Yy5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItYWdvcmEtcnRjL2xpYi9BZ29yYUNsaWVudC50cyIsIm5nOi8vYW5ndWxhci1hZ29yYS1ydGMvbGliL1N0cmVhbS50cyIsIm5nOi8vYW5ndWxhci1hZ29yYS1ydGMvbGliL0RldmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQWdvcmFDb25maWd7XG4gICAgQXBwSUQ6c3RyaW5nO1xufSIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQWdvcmFSVEMgZnJvbSAnYWdvcmEtcnRjLXNkayc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFnb3JhQ29uZmlnIH0gZnJvbSAnLi9BZ29yYUNvbmZpZyc7XG5pbXBvcnQgeyBBZ29yYUNsaWVudCB9IGZyb20gJy4vQWdvcmFDbGllbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlIHtcblxuICBwdWJsaWMgYXVkaW9EZXZpY2VzOiBhbnlbXTtcbiAgcHVibGljIHZpZGVvRGV2aWNlczogYW55W107XG5cbiAgcHVibGljIGNsaWVudDogQWdvcmFDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBjb25maWc6QWdvcmFDb25maWdcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrU3lzdGVtUmVxdWlyZW1lbnRzKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyKCdlcnJvcicsICdXZWIgUlRDIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9IGVsc2V7XG4gICAgICB0aGlzLmdldERldmljZXMoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1N5c3RlbVJlcXVpcmVtZW50cygpIHtcbiAgICByZXR1cm4gQWdvcmFSVEMuY2hlY2tTeXN0ZW1SZXF1aXJlbWVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGV2aWNlcygpIHtcbiAgICBBZ29yYVJUQy5nZXREZXZpY2VzKChkZXZpY2VzKSA9PiB7XG4gICAgICBsZXQgYXVkaW9EZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZGV2aWNlID0+IHtcbiAgICAgICAgcmV0dXJuIGRldmljZS5raW5kID09PSAnYXVkaW9pbnB1dCcgJiYgZGV2aWNlLmRldmljZUlkICE9PSAnZGVmYXVsdCdcbiAgICAgIH0pO1xuICAgICAgbGV0IHZpZGVvRGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnICYmIGRldmljZS5kZXZpY2VJZCAhPT0gJ2RlZmF1bHQnXG4gICAgICB9KTtcbiAgICAgIHRoaXMuYXVkaW9EZXZpY2VzID0gYXVkaW9EZXZpY2VzO1xuICAgICAgdGhpcy52aWRlb0RldmljZXMgPSB2aWRlb0RldmljZXM7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVDbGllbnQobW9kZTogc3RyaW5nID0gJ2ludGVyb3AnKSB7XG4gICAgIHRoaXMuY2xpZW50ID0gQWdvcmFSVEMuY3JlYXRlQ2xpZW50KHsgbW9kZTogbW9kZSB9KTtcbiAgICAgdGhpcy5jbGllbnQuaW5pdCh0aGlzLmNvbmZpZy5BcHBJRCk7XG4gIH1cblxuICBjcmVhdGVTdHJlYW0oc3RyZWFtSUQ6IGFueSwgYXVkaW86IGJvb2xlYW4sIGNhbWVyYUlkOiBzdHJpbmcgPSB0aGlzLnZpZGVvRGV2aWNlc1swXS5kZXZpY2VJZCwgbWljcm9waG9uZUlkOiBzdHJpbmcgPSB0aGlzLmF1ZGlvRGV2aWNlc1swXS5kZXZpY2VJZCwgdmlkZW86IGJvb2xlYW4sIHNjcmVlbjogYm9vbGVhbikge1xuICAgIHJldHVybiBBZ29yYVJUQy5jcmVhdGVTdHJlYW0oe3N0cmVhbUlELCBhdWRpbywgY2FtZXJhSWQsIG1pY3JvcGhvbmVJZCwgdmlkZW8sIHNjcmVlbn0pO1xuICB9XG5cbiAgbG9nZ2VyKHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgQWdvcmFSVEMuTG9nZ2VyLndhcm5pbmcobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RlYnVnJzpcbiAgICAgICAgQWdvcmFSVEMuTG9nZ2VyLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIEFnb3JhUlRDLkxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5ndWxhckFnb3JhUnRjU2VydmljZSB9IGZyb20gJy4vYW5ndWxhci1hZ29yYS1ydGMuc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW0gfSBmcm9tICcuL1N0cmVhbSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fnb3JhLXJ0YycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpZGVvLWNvbnRhaW5lclwiPlxuXHQ8ZGl2IGNsYXNzPVwiY2FsbC1jb250YWluZXJcIj5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJhZ29yYV9sb2NhbFwiPlxuXHRcdDxkaXYgY2xhc3M9XCJ2aWRlby1idXR0b25zXCI+XG5cdFx0XHQ8aSBjbGFzcz1cInN0YXJ0Q2FsbCBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJzdGFydENhbGwoKVwiICpuZ0lmPVwiIWFjdGl2ZUNhbGxcIj52aWRlb2NhbTwvaT5cblx0XHRcdDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3RpdmVDYWxsXCI+XG5cdFx0XHRcdDxpIGNsYXNzPVwiZW5kQ2FsbCBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJsZWF2ZSgpXCIgKm5nSWY9XCJhY3RpdmVDYWxsXCI+cGhvbmU8L2k+XG5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiICpuZ0lmPVwiYXVkaW9FbmFibGVkXCI+bWljPC9pPlxuXHRcdFx0XHQ8aSBjbGFzcz1cIm1pYyBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJ0b2dnbGVBdWRpbygpXCIgKm5nSWY9XCIhYXVkaW9FbmFibGVkXCI+bWljX29mZjwvaT5cblxuXHRcdFx0XHQ8aSBjbGFzcz1cIm1pYyBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJ0b2dnbGVWaWRlbygpXCIgKm5nSWY9XCJ2aWRlb0VuYWJsZWRcIj52aWRlb2NhbTwvaT5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlVmlkZW8oKVwiICpuZ0lmPVwiIXZpZGVvRW5hYmxlZFwiPnZpZGVvY2FtX29mZjwvaT5cblx0XHRcdDwvbmctY29udGFpbmVyPlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgaWQ9XCJhZ29yYV9sb2NhbFwiPjwvZGl2PlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImFnb3JhX3JlbW90ZVwiICpuZ0Zvcj1cImxldCByZW1vdGUgb2YgcmVtb3RlQ2FsbHNcIiBbaWRdPVwicmVtb3RlXCI+XG5cblx0PC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucyk7cHtmb250LWZhbWlseTpMYXRvfS52aWRlby1jb250YWluZXJ7aGVpZ2h0OjEwMHZoO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYWdvcmFfbG9jYWx7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2hlaWdodDoyNTBweDt3aWR0aDoyNTBweDtib3JkZXI6MXB4IHNvbGlkICMwMDA7bWFyZ2luOjhweH0jYWdvcmFfbG9jYWx7aGVpZ2h0OjI1MHB4O3dpZHRoOjI1MHB4O3RvcDotMjhweH0uYWdvcmFfcmVtb3Rle2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtoZWlnaHQ6MjUwcHg7d2lkdGg6MjUwcHg7Ym9yZGVyOjFweCBzb2xpZCAjMDAwO21hcmdpbjo4cHh9LnZpZGVvLWJ1dHRvbnN7d2lkdGg6MjUwcHg7dG9wOjIxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6OTk5fS52aWRlby1idXR0b25zIGl7Y3Vyc29yOnBvaW50ZXJ9LmVuZENhbGx7Y29sb3I6cmVkfS5taWMsLnN0YXJ0Q2FsbHtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIEFnb3JhTG9jYWxDb21wb25lbnQge1xuXG4gIGFjdGl2ZUNhbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYXVkaW9FbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgdmlkZW9FbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgbG9jYWxTdHJlYW06IFN0cmVhbVxuICByZW1vdGVDYWxsczogYW55ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhZ29yYVNlcnZpY2U6IEFuZ3VsYXJBZ29yYVJ0Y1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY3JlYXRlQ2xpZW50KCk7XG4gIH1cblxuICBzdGFydENhbGwoKSB7XG4gICAgdGhpcy5hY3RpdmVDYWxsID0gdHJ1ZTtcbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQuam9pbihudWxsLCAnMTAwMCcsIG51bGwsICh1aWQpID0+IHtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW0gPSB0aGlzLmFnb3JhU2VydmljZS5jcmVhdGVTdHJlYW0odWlkLCB0cnVlLCBudWxsLCBudWxsLCB0cnVlLCBmYWxzZSk7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtLnNldFZpZGVvUHJvZmlsZSgnNzIwcF8zJyk7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU3RyZWFtcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1N0cmVhbXMoKSB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbS5vbihcImFjY2Vzc0FsbG93ZWRcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJhY2Nlc3NBbGxvd2VkXCIpO1xuICAgIH0pO1xuICAgIC8vIFRoZSB1c2VyIGhhcyBkZW5pZWQgYWNjZXNzIHRvIHRoZSBjYW1lcmEgYW5kIG1pYy5cbiAgICB0aGlzLmxvY2FsU3RyZWFtLm9uKFwiYWNjZXNzRGVuaWVkXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXNzRGVuaWVkXCIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2NhbFN0cmVhbS5pbml0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VXNlck1lZGlhIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW0ucGxheSgnYWdvcmFfbG9jYWwnKTtcbiAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5wdWJsaXNoKHRoaXMubG9jYWxTdHJlYW0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQdWJsaXNoIGxvY2FsIHN0cmVhbSBlcnJvcjogXCIgKyBlcnIpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ3N0cmVhbS1wdWJsaXNoZWQnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHVibGlzaCBsb2NhbCBzdHJlYW0gc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJnZXRVc2VyTWVkaWEgZmFpbGVkXCIsIGVycik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJHb3QgZXJyb3IgbXNnOlwiLCBlcnIucmVhc29uKTtcbiAgICAgIGlmIChlcnIucmVhc29uID09PSAnRFlOQU1JQ19LRVlfVElNRU9VVCcpIHtcbiAgICAgICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LnJlbmV3Q2hhbm5lbEtleShcIlwiLCAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW5ldyBjaGFubmVsIGtleSBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbmV3IGNoYW5uZWwga2V5IGZhaWxlZDogXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tYWRkZWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBldnQuc3RyZWFtO1xuICAgICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LnN1YnNjcmliZShzdHJlYW0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmUgc3RyZWFtIGZhaWxlZFwiLCBlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ3N0cmVhbS1zdWJzY3JpYmVkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIGlmICghdGhpcy5yZW1vdGVDYWxscy5pbmNsdWRlcyhgYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKSkgdGhpcy5yZW1vdGVDYWxscy5wdXNoKGBhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzdHJlYW0ucGxheShgYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKSwgMjAwMCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ3N0cmVhbS1yZW1vdmVkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIHN0cmVhbS5zdG9wKCk7XG4gICAgICB0aGlzLnJlbW90ZUNhbGxzID0gdGhpcy5yZW1vdGVDYWxscy5maWx0ZXIoY2FsbCA9PiBjYWxsICE9PSBgI2Fnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgUmVtb3RlIHN0cmVhbSBpcyByZW1vdmVkICR7c3RyZWFtLmdldElkKCl9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ3BlZXItbGVhdmUnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBldnQuc3RyZWFtO1xuICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgICB0aGlzLnJlbW90ZUNhbGxzID0gdGhpcy5yZW1vdGVDYWxscy5maWx0ZXIoY2FsbCA9PiBjYWxsID09PSBgI2Fnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2V2dC51aWR9IGxlZnQgZnJvbSB0aGlzIGNoYW5uZWxgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBsZWF2ZSgpIHtcbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQubGVhdmUoKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmVDYWxsID0gZmFsc2U7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdvcmFfbG9jYWwnKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29uc29sZS5sb2coXCJMZWF2ZWwgY2hhbm5lbCBzdWNjZXNzZnVsbHlcIik7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJMZWF2ZSBjaGFubmVsIGZhaWxlZFwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZUF1ZGlvKCkge1xuICAgIHRoaXMuYXVkaW9FbmFibGVkID0gIXRoaXMuYXVkaW9FbmFibGVkO1xuICAgIGlmICh0aGlzLmF1ZGlvRW5hYmxlZCkgdGhpcy5sb2NhbFN0cmVhbS5lbmFibGVBdWRpbygpO1xuICAgIGVsc2UgdGhpcy5sb2NhbFN0cmVhbS5kaXNhYmxlQXVkaW8oKTtcbiAgfVxuXG4gIHRvZ2dsZVZpZGVvKCkge1xuICAgIHRoaXMudmlkZW9FbmFibGVkID0gIXRoaXMudmlkZW9FbmFibGVkO1xuICAgIGlmICh0aGlzLnZpZGVvRW5hYmxlZCkgdGhpcy5sb2NhbFN0cmVhbS5lbmFibGVWaWRlbygpO1xuICAgIGVsc2UgdGhpcy5sb2NhbFN0cmVhbS5kaXNhYmxlVmlkZW8oKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWdvcmFMb2NhbENvbXBvbmVudCB9IGZyb20gJy4vYWdvcmEtbG9jYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEFnb3JhQ29uZmlnIH0gZnJvbSAnLi9BZ29yYUNvbmZpZyc7XG5pbXBvcnQgeyBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlIH0gZnJvbSAnLi9hbmd1bGFyLWFnb3JhLXJ0Yy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQWdvcmFMb2NhbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBZ29yYUxvY2FsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQWdvcmFSdGNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEFnb3JhQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJBZ29yYVJ0Y01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0FuZ3VsYXJBZ29yYVJ0Y1NlcnZpY2UsIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZ31dXG4gICAgfTtcbiAgfVxuIH1cbiIsImV4cG9ydCBjbGFzcyBBZ29yYUNsaWVudCB7XG4gICAgYWVzTW9kZTogc3RyaW5nO1xuICAgIGFlc3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgY29uZmlnUHVibGlzaGVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzYWJsZUR1YWxTdHJlYW06IGFueTsgLy8gZnVuY3Rpb25cbiAgICBlbmFibGVEdWFsU3RyZWFtOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2F0ZXdheUNsaWVudDoge307IC8vIGFkZCBvYmplY3RcbiAgICBoaWdoU3RyZWFtOiBhbnk7IC8vID8gdHlwZVxuICAgIGhpZ2hTdHJlYW1TdGF0ZTogbnVtYmVyO1xuICAgIGluaXQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpc0R1YWxTdHJlYW06IGJvb2xlYW47XG4gICAgam9pbjogYW55OyAvLyBmdW5jdGlvblxuICAgIGtleTogYW55OyAvLyA/IHN0cmluZ1xuICAgIGxlYXZlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgbG93U3RyZWFtOiBhbnk7IC8vID9cbiAgICBsb3dTdHJlYW1QYXJhbWV0ZXI6IGFueSAvLyA/XG4gICAgbG93U3RyZWFtU3RhdGU6IG51bWJlcjtcbiAgICBvbjogYW55OyAvLyBmdW5jdGlvblxuICAgIHByb3h5U2VydmVyOiBhbnk7IC8vID9cbiAgICBwdWJsaXNoOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgcmVuZXdDaGFubmVsS2V5OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0RW5jcnlwdGlvbk1vZGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRFbmNyeXB0aW9uU2VjcmV0OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0TGl2ZVRyYW5zY29kaW5nOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0TG93U3RyZWFtUGFyYW1ldGVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0UHJveHlTZXJ2ZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRSZW1vdGVWaWRlb1N0cmVhbVR5cGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRUdXJuU2VydmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RhcnRMaXZlU3RyZWFtaW5nOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RvcExpdmVTdHJlYW1pbmc6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdWJzY3JpYmU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICB0dXJuU2VydmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgdW5wdWJsaXNoOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgdW5zdWJzY3JpYmU6IGFueTsgLy8gZnVuY3Rpb25cbiAgfSIsImV4cG9ydCBjbGFzcyBTdHJlYW0ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBhdWRpbzogYm9vbGVhbjtcbiAgICBhdWRpb0VuYWJsZWQ6IGJvb2xlYW47XG4gICAgYXVkaW9MZXZlbEhlbHBlcjogYW55IC8vID9cbiAgICBhdXhfc3RyZWFtOiBhbnk7IC8vID9cbiAgICBjbG9zZTogYW55OyAvLyBmdW5jdGlvbiBcbiAgICBkaXNhYmxlQXVkaW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNhYmxlVmlkZW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNwYXRjaEV2ZW50OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzcGF0Y2hTb2NrZXRFdmVudDogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc3BhdGNoZXI6IGFueTsgLy8gZXZlbnQgbGlzdGVuZXJcbiAgICBlbmFibGVBdWRpbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGVuYWJsZVZpZGVvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2V0QXR0cmlidXRlczogYW55OyAvLyBmdW5jdGlvblxuICAgIGdldEF1ZGlvTGV2ZWw6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRJZDogYW55OyAvLyBmdW5jdGlvblxuICAgIGdldFN0YXRzOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaGFzQXVkaW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBoYXNTY3JlZW46IGFueTsgLy8gZnVuY3Rpb25cbiAgICBoYXNWaWRlbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGluaXQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICBpc0F1ZGlvT246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpc1ZpZGVvT246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBsb2NhbDogYm9vbGVhbjtcbiAgICBsb3dTdHJlYW06IGFueTsgLy8/XG4gICAgbWlycm9yOiBib29sZWFuO1xuICAgIG11dGVBdWRpbzogYW55OyAvLyA/XG4gICAgbXV0ZVZpZGVvOiBhbnk7IC8vID9cbiAgICBvbjogYW55OyAvLyBmdW5jdGlvblxuICAgIG9uQ2xvc2U6IGFueSAvLyA/XG4gICAgcGFyYW1zOlxuICAgICAgICB7IHN0cmVhbUlEOiBudW1iZXIsIGF1ZGlvOiBib29sZWFuLCBjYW1lcmFJZDogc3RyaW5nLCBtaWNyb3Bob25lSWQ6IHN0cmluZywgdmlkZW86IGJvb2xlYW4gfVxuICAgIHBsYXk6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBwbGF5ZXI6IGFueTsgLy8gP1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzY3JlZW46IGJvb2xlYW47XG4gICAgc2NyZWVuQXR0cmlidXRlczogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbWF4RnI6IG51bWJlciwgbWluRnI6IG51bWJlciB9XG4gICAgc2V0U2NyZWVuUHJvZmlsZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvQml0UmF0ZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvRnJhbWVSYXRlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9Qcm9maWxlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9Qcm9maWxlQ3VzdG9tOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9Qcm9maWxlQ3VzdG9tUGx1czogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUmVzb2x1dGlvbjogYW55OyAvLyBmdW5jdGlvblxuICAgIHN0b3A6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdHJlYW1MYW55bCAvLyA/XG4gICAgc3RyZWFtSWQ6IG51bWJlcjtcbiAgICB1bm11dGVBdWRpbzogYW55OyAvLyA/XG4gICAgdW5tdXRlVmlkZW86IGFueTsgLy8gP1xuICAgIHVybDogYW55OyAvLz9cbiAgICB2aWRlbzogYm9vbGVhbjtcbiAgICB2aWRlb0VuYWJsZWQ6IGJvb2xlYW47XG4gICAgdmlkZW9IZWlnaHQ6IG51bWJlcjtcbiAgICB2aWRlb1NpemU6IEFycmF5PG51bWJlcj5cbiAgICB2aWRlb1dpZHRoOiBudW1iZXI7XG59IiwiZXhwb3J0IGNsYXNzIERldmljZSB7XG4gICAgZGV2aWNlSWQ6c3RyaW5nO1xuICAgIGdyb3VwSWQ6c3RyaW5nO1xuICAgIGtpbmQ6c3RyaW5nO1xuICAgIGxhYmVsOnN0cmluZztcbn0iXSwibmFtZXMiOlsiQWdvcmFSVEMuY2hlY2tTeXN0ZW1SZXF1aXJlbWVudHMiLCJBZ29yYVJUQy5nZXREZXZpY2VzIiwiQWdvcmFSVEMuY3JlYXRlQ2xpZW50IiwiQWdvcmFSVEMuY3JlYXRlU3RyZWFtIiwiQWdvcmFSVEMuTG9nZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0NBRUM7Ozs7OztBQ0ZEOzs7O0lBZ0JFLFlBQzRCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7U0FDbEQ7YUFBSztZQUNKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtLQUNGOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLE9BQU9BLHVCQUFnQyxFQUFFLENBQUM7S0FDM0M7Ozs7SUFFTyxVQUFVO1FBQ2hCQyxVQUFtQixDQUFDLENBQUMsT0FBTzs7WUFDMUIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUN0QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFBO2FBQ3JFLENBQUMsQ0FBQzs7WUFDSCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ3RDLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUE7YUFDckUsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7U0FD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