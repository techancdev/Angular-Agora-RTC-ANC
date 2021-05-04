/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { AngularAgoraRtcService } from './angular-agora-rtc.service';
export class AgoraLocalComponent {
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
function AgoraLocalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AgoraLocalComponent.prototype.activeCall;
    /** @type {?} */
    AgoraLocalComponent.prototype.audioEnabled;
    /** @type {?} */
    AgoraLocalComponent.prototype.videoEnabled;
    /** @type {?} */
    AgoraLocalComponent.prototype.localStream;
    /** @type {?} */
    AgoraLocalComponent.prototype.remoteCalls;
    /** @type {?} */
    AgoraLocalComponent.prototype.agoraService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvcmEtbG9jYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvYWdvcmEtbG9jYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBNkJyRSxNQUFNOzs7O0lBUUosWUFDVTtRQUFBLGlCQUFZLEdBQVosWUFBWTswQkFQQSxLQUFLOzRCQUNILElBQUk7NEJBQ0osSUFBSTsyQkFFVCxFQUFFO1FBS25CLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDbEM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCLENBQUMsQ0FBQztLQUNKOzs7O0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7O1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FB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QyxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7S0FDSjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxJQUFJO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN0Qzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxJQUFJO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN0Qzs7O1lBbklGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkw7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsa2xCQUFrbEIsQ0FBQzthQUM3bEI7Ozs7WUE1QlEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlIH0gZnJvbSAnLi9hbmd1bGFyLWFnb3JhLXJ0Yy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbSB9IGZyb20gJy4vU3RyZWFtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWdvcmEtcnRjJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlkZW8tY29udGFpbmVyXCI+XG5cdDxkaXYgY2xhc3M9XCJjYWxsLWNvbnRhaW5lclwiPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImFnb3JhX2xvY2FsXCI+XG5cdFx0PGRpdiBjbGFzcz1cInZpZGVvLWJ1dHRvbnNcIj5cblx0XHRcdDxpIGNsYXNzPVwic3RhcnRDYWxsIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInN0YXJ0Q2FsbCgpXCIgKm5nSWY9XCIhYWN0aXZlQ2FsbFwiPnZpZGVvY2FtPC9pPlxuXHRcdFx0PG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGl2ZUNhbGxcIj5cblx0XHRcdFx0PGkgY2xhc3M9XCJlbmRDYWxsIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cImxlYXZlKClcIiAqbmdJZj1cImFjdGl2ZUNhbGxcIj5waG9uZTwvaT5cblxuXHRcdFx0XHQ8aSBjbGFzcz1cIm1pYyBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJ0b2dnbGVBdWRpbygpXCIgKm5nSWY9XCJhdWRpb0VuYWJsZWRcIj5taWM8L2k+XG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZUF1ZGlvKClcIiAqbmdJZj1cIiFhdWRpb0VuYWJsZWRcIj5taWNfb2ZmPC9pPlxuXG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZVZpZGVvKClcIiAqbmdJZj1cInZpZGVvRW5hYmxlZFwiPnZpZGVvY2FtPC9pPlxuXHRcdFx0XHQ8aSBjbGFzcz1cIm1pYyBtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJ0b2dnbGVWaWRlbygpXCIgKm5nSWY9XCIhdmlkZW9FbmFibGVkXCI+dmlkZW9jYW1fb2ZmPC9pPlxuXHRcdFx0PC9uZy1jb250YWluZXI+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBpZD1cImFnb3JhX2xvY2FsXCI+PC9kaXY+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYWdvcmFfcmVtb3RlXCIgKm5nRm9yPVwibGV0IHJlbW90ZSBvZiByZW1vdGVDYWxsc1wiIFtpZF09XCJyZW1vdGVcIj5cblxuXHQ8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zKTtwe2ZvbnQtZmFtaWx5OkxhdG99LnZpZGVvLWNvbnRhaW5lcntoZWlnaHQ6MTAwdmg7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hZ29yYV9sb2NhbHtiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7aGVpZ2h0OjI1MHB4O3dpZHRoOjI1MHB4O2JvcmRlcjoxcHggc29saWQgIzAwMDttYXJnaW46OHB4fSNhZ29yYV9sb2NhbHtoZWlnaHQ6MjUwcHg7d2lkdGg6MjUwcHg7dG9wOi0yOHB4fS5hZ29yYV9yZW1vdGV7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2hlaWdodDoyNTBweDt3aWR0aDoyNTBweDtib3JkZXI6MXB4IHNvbGlkICMwMDA7bWFyZ2luOjhweH0udmlkZW8tYnV0dG9uc3t3aWR0aDoyNTBweDt0b3A6MjEwcHg7cG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7ei1pbmRleDo5OTl9LnZpZGVvLWJ1dHRvbnMgaXtjdXJzb3I6cG9pbnRlcn0uZW5kQ2FsbHtjb2xvcjpyZWR9Lm1pYywuc3RhcnRDYWxse2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgQWdvcmFMb2NhbENvbXBvbmVudCB7XG5cbiAgYWN0aXZlQ2FsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBhdWRpb0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICB2aWRlb0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBsb2NhbFN0cmVhbTogU3RyZWFtXG4gIHJlbW90ZUNhbGxzOiBhbnkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFnb3JhU2VydmljZTogQW5ndWxhckFnb3JhUnRjU2VydmljZVxuICApIHtcbiAgICB0aGlzLmFnb3JhU2VydmljZS5jcmVhdGVDbGllbnQoKTtcbiAgfVxuXG4gIHN0YXJ0Q2FsbCgpIHtcbiAgICB0aGlzLmFjdGl2ZUNhbGwgPSB0cnVlO1xuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5qb2luKG51bGwsICcxMDAwJywgbnVsbCwgKHVpZCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbSA9IHRoaXMuYWdvcmFTZXJ2aWNlLmNyZWF0ZVN0cmVhbSh1aWQsIHRydWUsIG51bGwsIG51bGwsIHRydWUsIGZhbHNlKTtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW0uc2V0VmlkZW9Qcm9maWxlKCc3MjBwXzMnKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9TdHJlYW1zKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU3RyZWFtcygpIHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtLm9uKFwiYWNjZXNzQWxsb3dlZFwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImFjY2Vzc0FsbG93ZWRcIik7XG4gICAgfSk7XG4gICAgLy8gVGhlIHVzZXIgaGFzIGRlbmllZCBhY2Nlc3MgdG8gdGhlIGNhbWVyYSBhbmQgbWljLlxuICAgIHRoaXMubG9jYWxTdHJlYW0ub24oXCJhY2Nlc3NEZW5pZWRcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJhY2Nlc3NEZW5pZWRcIik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtLmluaXQoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJnZXRVc2VyTWVkaWEgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbS5wbGF5KCdhZ29yYV9sb2NhbCcpO1xuICAgICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LnB1Ymxpc2godGhpcy5sb2NhbFN0cmVhbSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlB1Ymxpc2ggbG9jYWwgc3RyZWFtIGVycm9yOiBcIiArIGVycik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignc3RyZWFtLXB1Ymxpc2hlZCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQdWJsaXNoIGxvY2FsIHN0cmVhbSBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdldFVzZXJNZWRpYSBmYWlsZWRcIiwgZXJyKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkdvdCBlcnJvciBtc2c6XCIsIGVyci5yZWFzb24pO1xuICAgICAgaWYgKGVyci5yZWFzb24gPT09ICdEWU5BTUlDX0tFWV9USU1FT1VUJykge1xuICAgICAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQucmVuZXdDaGFubmVsS2V5KFwiXCIsICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbmV3IGNoYW5uZWwga2V5IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVuZXcgY2hhbm5lbCBrZXkgZmFpbGVkOiBcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQub24oJ3N0cmVhbS1hZGRlZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQuc3Vic2NyaWJlKHN0cmVhbSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliZSBzdHJlYW0gZmFpbGVkXCIsIGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignc3RyZWFtLXN1YnNjcmliZWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBldnQuc3RyZWFtO1xuICAgICAgaWYgKCF0aGlzLnJlbW90ZUNhbGxzLmluY2x1ZGVzKGBhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApKSB0aGlzLnJlbW90ZUNhbGxzLnB1c2goYGFnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHN0cmVhbS5wbGF5KGBhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApLCAyMDAwKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignc3RyZWFtLXJlbW92ZWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBldnQuc3RyZWFtO1xuICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgIHRoaXMucmVtb3RlQ2FsbHMgPSB0aGlzLnJlbW90ZUNhbGxzLmZpbHRlcihjYWxsID0+IGNhbGwgIT09IGAjYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBSZW1vdGUgc3RyZWFtIGlzIHJlbW92ZWQgJHtzdHJlYW0uZ2V0SWQoKX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbigncGVlci1sZWF2ZScsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIHN0cmVhbS5zdG9wKCk7XG4gICAgICAgIHRoaXMucmVtb3RlQ2FsbHMgPSB0aGlzLnJlbW90ZUNhbGxzLmZpbHRlcihjYWxsID0+IGNhbGwgPT09IGAjYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7ZXZ0LnVpZH0gbGVmdCBmcm9tIHRoaXMgY2hhbm5lbGApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGxlYXZlKCkge1xuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5sZWF2ZSgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZUNhbGwgPSBmYWxzZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ29yYV9sb2NhbCcpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBjb25zb2xlLmxvZyhcIkxlYXZlbCBjaGFubmVsIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkxlYXZlIGNoYW5uZWwgZmFpbGVkXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlQXVkaW8oKSB7XG4gICAgdGhpcy5hdWRpb0VuYWJsZWQgPSAhdGhpcy5hdWRpb0VuYWJsZWQ7XG4gICAgaWYgKHRoaXMuYXVkaW9FbmFibGVkKSB0aGlzLmxvY2FsU3RyZWFtLmVuYWJsZUF1ZGlvKCk7XG4gICAgZWxzZSB0aGlzLmxvY2FsU3RyZWFtLmRpc2FibGVBdWRpbygpO1xuICB9XG5cbiAgdG9nZ2xlVmlkZW8oKSB7XG4gICAgdGhpcy52aWRlb0VuYWJsZWQgPSAhdGhpcy52aWRlb0VuYWJsZWQ7XG4gICAgaWYgKHRoaXMudmlkZW9FbmFibGVkKSB0aGlzLmxvY2FsU3RyZWFtLmVuYWJsZVZpZGVvKCk7XG4gICAgZWxzZSB0aGlzLmxvY2FsU3RyZWFtLmRpc2FibGVWaWRlbygpO1xuICB9XG5cbn1cbiJdfQ==