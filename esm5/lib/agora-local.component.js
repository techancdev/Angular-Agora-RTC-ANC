/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { AngularAgoraRtcService } from './angular-agora-rtc.service';
var AgoraLocalComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'agora-rtc',
                    template: "<div class=\"video-container\">\n\t<div class=\"call-container\">\n\t</div>\n\t<div class=\"agora_local\">\n\t\t<div class=\"video-buttons\">\n\t\t\t<i class=\"startCall material-icons\" (click)=\"startCall()\" *ngIf=\"!activeCall\">videocam</i>\n\t\t\t<ng-container *ngIf=\"activeCall\">\n\t\t\t\t<i class=\"endCall material-icons\" (click)=\"leave()\" *ngIf=\"activeCall\">phone</i>\n\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleAudio()\" *ngIf=\"audioEnabled\">mic</i>\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleAudio()\" *ngIf=\"!audioEnabled\">mic_off</i>\n\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleVideo()\" *ngIf=\"videoEnabled\">videocam</i>\n\t\t\t\t<i class=\"mic material-icons\" (click)=\"toggleVideo()\" *ngIf=\"!videoEnabled\">videocam_off</i>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<div id=\"agora_local\"></div>\n\t</div>\n\t<div class=\"agora_remote\" *ngFor=\"let remote of remoteCalls\" [id]=\"remote\">\n\n\t</div>\n</div>",
                    styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);p{font-family:Lato}.video-container{height:100vh;display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center}.agora_local{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}#agora_local{height:250px;width:250px;top:-28px}.agora_remote{background-color:#404040;height:250px;width:250px;border:1px solid #000;margin:8px}.video-buttons{width:250px;top:210px;position:relative;text-align:center;z-index:999}.video-buttons i{cursor:pointer}.endCall{color:red}.mic,.startCall{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    AgoraLocalComponent.ctorParameters = function () { return [
        { type: AngularAgoraRtcService }
    ]; };
    return AgoraLocalComponent;
}());
export { AgoraLocalComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvcmEtbG9jYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvYWdvcmEtbG9jYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQXFDbkUsNkJBQ1U7UUFBQSxpQkFBWSxHQUFaLFlBQVk7MEJBUEEsS0FBSzs0QkFDSCxJQUFJOzRCQUNKLElBQUk7MkJBRVQsRUFBRTtRQUtuQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2xDOzs7O0lBRUQsdUNBQVM7OztJQUFUO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBQyxHQUFHO1lBQ3BELEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RixLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQixDQUFDLENBQUM7S0FDSjs7OztJQUVPLGdEQUFrQjs7Ozs7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDOztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxD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LENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxJQUFJO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN0Qzs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RELElBQUk7WUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3RDOztnQkFuSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsNDlCQXFCTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxrbEJBQWtsQixDQUFDO2lCQUM3bEI7Ozs7Z0JBNUJRLHNCQUFzQjs7OEJBRC9COztTQThCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJBZ29yYVJ0Y1NlcnZpY2UgfSBmcm9tICcuL2FuZ3VsYXItYWdvcmEtcnRjLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtIH0gZnJvbSAnLi9TdHJlYW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZ29yYS1ydGMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWRlby1jb250YWluZXJcIj5cblx0PGRpdiBjbGFzcz1cImNhbGwtY29udGFpbmVyXCI+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYWdvcmFfbG9jYWxcIj5cblx0XHQ8ZGl2IGNsYXNzPVwidmlkZW8tYnV0dG9uc1wiPlxuXHRcdFx0PGkgY2xhc3M9XCJzdGFydENhbGwgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwic3RhcnRDYWxsKClcIiAqbmdJZj1cIiFhY3RpdmVDYWxsXCI+dmlkZW9jYW08L2k+XG5cdFx0XHQ8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aXZlQ2FsbFwiPlxuXHRcdFx0XHQ8aSBjbGFzcz1cImVuZENhbGwgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwibGVhdmUoKVwiICpuZ0lmPVwiYWN0aXZlQ2FsbFwiPnBob25lPC9pPlxuXG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZUF1ZGlvKClcIiAqbmdJZj1cImF1ZGlvRW5hYmxlZFwiPm1pYzwvaT5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiICpuZ0lmPVwiIWF1ZGlvRW5hYmxlZFwiPm1pY19vZmY8L2k+XG5cblx0XHRcdFx0PGkgY2xhc3M9XCJtaWMgbWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwidG9nZ2xlVmlkZW8oKVwiICpuZ0lmPVwidmlkZW9FbmFibGVkXCI+dmlkZW9jYW08L2k+XG5cdFx0XHRcdDxpIGNsYXNzPVwibWljIG1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInRvZ2dsZVZpZGVvKClcIiAqbmdJZj1cIiF2aWRlb0VuYWJsZWRcIj52aWRlb2NhbV9vZmY8L2k+XG5cdFx0XHQ8L25nLWNvbnRhaW5lcj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGlkPVwiYWdvcmFfbG9jYWxcIj48L2Rpdj5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJhZ29yYV9yZW1vdGVcIiAqbmdGb3I9XCJsZXQgcmVtb3RlIG9mIHJlbW90ZUNhbGxzXCIgW2lkXT1cInJlbW90ZVwiPlxuXG5cdDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpO3B7Zm9udC1mYW1pbHk6TGF0b30udmlkZW8tY29udGFpbmVye2hlaWdodDoxMDB2aDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFnb3JhX2xvY2Fse2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtoZWlnaHQ6MjUwcHg7d2lkdGg6MjUwcHg7Ym9yZGVyOjFweCBzb2xpZCAjMDAwO21hcmdpbjo4cHh9I2Fnb3JhX2xvY2Fse2hlaWdodDoyNTBweDt3aWR0aDoyNTBweDt0b3A6LTI4cHh9LmFnb3JhX3JlbW90ZXtiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7aGVpZ2h0OjI1MHB4O3dpZHRoOjI1MHB4O2JvcmRlcjoxcHggc29saWQgIzAwMDttYXJnaW46OHB4fS52aWRlby1idXR0b25ze3dpZHRoOjI1MHB4O3RvcDoyMTBweDtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OX0udmlkZW8tYnV0dG9ucyBpe2N1cnNvcjpwb2ludGVyfS5lbmRDYWxse2NvbG9yOnJlZH0ubWljLC5zdGFydENhbGx7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBBZ29yYUxvY2FsQ29tcG9uZW50IHtcblxuICBhY3RpdmVDYWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGF1ZGlvRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIHZpZGVvRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGxvY2FsU3RyZWFtOiBTdHJlYW1cbiAgcmVtb3RlQ2FsbHM6IGFueSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWdvcmFTZXJ2aWNlOiBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNyZWF0ZUNsaWVudCgpO1xuICB9XG5cbiAgc3RhcnRDYWxsKCkge1xuICAgIHRoaXMuYWN0aXZlQ2FsbCA9IHRydWU7XG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LmpvaW4obnVsbCwgJzEwMDAnLCBudWxsLCAodWlkKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtID0gdGhpcy5hZ29yYVNlcnZpY2UuY3JlYXRlU3RyZWFtKHVpZCwgdHJ1ZSwgbnVsbCwgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbS5zZXRWaWRlb1Byb2ZpbGUoJzcyMHBfMycpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb1N0cmVhbXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TdHJlYW1zKCkge1xuICAgIHRoaXMubG9jYWxTdHJlYW0ub24oXCJhY2Nlc3NBbGxvd2VkXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXNzQWxsb3dlZFwiKTtcbiAgICB9KTtcbiAgICAvLyBUaGUgdXNlciBoYXMgZGVuaWVkIGFjY2VzcyB0byB0aGUgY2FtZXJhIGFuZCBtaWMuXG4gICAgdGhpcy5sb2NhbFN0cmVhbS5vbihcImFjY2Vzc0RlbmllZFwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImFjY2Vzc0RlbmllZFwiKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9jYWxTdHJlYW0uaW5pdCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImdldFVzZXJNZWRpYSBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtLnBsYXkoJ2Fnb3JhX2xvY2FsJyk7XG4gICAgICB0aGlzLmFnb3JhU2VydmljZS5jbGllbnQucHVibGlzaCh0aGlzLmxvY2FsU3RyZWFtLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHVibGlzaCBsb2NhbCBzdHJlYW0gZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tcHVibGlzaGVkJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlB1Ymxpc2ggbG9jYWwgc3RyZWFtIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VXNlck1lZGlhIGZhaWxlZFwiLCBlcnIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiR290IGVycm9yIG1zZzpcIiwgZXJyLnJlYXNvbik7XG4gICAgICBpZiAoZXJyLnJlYXNvbiA9PT0gJ0RZTkFNSUNfS0VZX1RJTUVPVVQnKSB7XG4gICAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5yZW5ld0NoYW5uZWxLZXkoXCJcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVuZXcgY2hhbm5lbCBrZXkgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW5ldyBjaGFubmVsIGtleSBmYWlsZWQ6IFwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5vbignc3RyZWFtLWFkZGVkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIHRoaXMuYWdvcmFTZXJ2aWNlLmNsaWVudC5zdWJzY3JpYmUoc3RyZWFtLCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJlIHN0cmVhbSBmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tc3Vic2NyaWJlZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICBpZiAoIXRoaXMucmVtb3RlQ2FsbHMuaW5jbHVkZXMoYGFnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCkpIHRoaXMucmVtb3RlQ2FsbHMucHVzaChgYWdvcmFfcmVtb3RlJHtzdHJlYW0uZ2V0SWQoKX1gKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLnBsYXkoYGFnb3JhX3JlbW90ZSR7c3RyZWFtLmdldElkKCl9YCksIDIwMDApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdzdHJlYW0tcmVtb3ZlZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgdGhpcy5yZW1vdGVDYWxscyA9IHRoaXMucmVtb3RlQ2FsbHMuZmlsdGVyKGNhbGwgPT4gY2FsbCAhPT0gYCNhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgICAgY29uc29sZS5sb2coYFJlbW90ZSBzdHJlYW0gaXMgcmVtb3ZlZCAke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50Lm9uKCdwZWVyLWxlYXZlJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gZXZ0LnN0cmVhbTtcbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yZW1vdGVDYWxscyA9IHRoaXMucmVtb3RlQ2FsbHMuZmlsdGVyKGNhbGwgPT4gY2FsbCA9PT0gYCNhZ29yYV9yZW1vdGUke3N0cmVhbS5nZXRJZCgpfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtldnQudWlkfSBsZWZ0IGZyb20gdGhpcyBjaGFubmVsYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbGVhdmUoKSB7XG4gICAgdGhpcy5hZ29yYVNlcnZpY2UuY2xpZW50LmxlYXZlKCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlQ2FsbCA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fnb3JhX2xvY2FsJykuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiTGVhdmVsIGNoYW5uZWwgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTGVhdmUgY2hhbm5lbCBmYWlsZWRcIik7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvRW5hYmxlZCA9ICF0aGlzLmF1ZGlvRW5hYmxlZDtcbiAgICBpZiAodGhpcy5hdWRpb0VuYWJsZWQpIHRoaXMubG9jYWxTdHJlYW0uZW5hYmxlQXVkaW8oKTtcbiAgICBlbHNlIHRoaXMubG9jYWxTdHJlYW0uZGlzYWJsZUF1ZGlvKCk7XG4gIH1cblxuICB0b2dnbGVWaWRlbygpIHtcbiAgICB0aGlzLnZpZGVvRW5hYmxlZCA9ICF0aGlzLnZpZGVvRW5hYmxlZDtcbiAgICBpZiAodGhpcy52aWRlb0VuYWJsZWQpIHRoaXMubG9jYWxTdHJlYW0uZW5hYmxlVmlkZW8oKTtcbiAgICBlbHNlIHRoaXMubG9jYWxTdHJlYW0uZGlzYWJsZVZpZGVvKCk7XG4gIH1cblxufVxuIl19