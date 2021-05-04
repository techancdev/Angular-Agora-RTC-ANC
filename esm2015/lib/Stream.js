/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class Stream {
}
function Stream_tsickle_Closure_declarations() {
    /** @type {?} */
    Stream.prototype.addEventListener;
    /** @type {?} */
    Stream.prototype.audio;
    /** @type {?} */
    Stream.prototype.audioEnabled;
    /** @type {?} */
    Stream.prototype.audioLevelHelper;
    /** @type {?} */
    Stream.prototype.aux_stream;
    /** @type {?} */
    Stream.prototype.close;
    /** @type {?} */
    Stream.prototype.disableAudio;
    /** @type {?} */
    Stream.prototype.disableVideo;
    /** @type {?} */
    Stream.prototype.dispatchEvent;
    /** @type {?} */
    Stream.prototype.dispatchSocketEvent;
    /** @type {?} */
    Stream.prototype.dispatcher;
    /** @type {?} */
    Stream.prototype.enableAudio;
    /** @type {?} */
    Stream.prototype.enableVideo;
    /** @type {?} */
    Stream.prototype.getAttributes;
    /** @type {?} */
    Stream.prototype.getAudioLevel;
    /** @type {?} */
    Stream.prototype.getId;
    /** @type {?} */
    Stream.prototype.getStats;
    /** @type {?} */
    Stream.prototype.hasAudio;
    /** @type {?} */
    Stream.prototype.hasScreen;
    /** @type {?} */
    Stream.prototype.hasVideo;
    /** @type {?} */
    Stream.prototype.init;
    /** @type {?} */
    Stream.prototype.initialized;
    /** @type {?} */
    Stream.prototype.isAudioOn;
    /** @type {?} */
    Stream.prototype.isVideoOn;
    /** @type {?} */
    Stream.prototype.local;
    /** @type {?} */
    Stream.prototype.lowStream;
    /** @type {?} */
    Stream.prototype.mirror;
    /** @type {?} */
    Stream.prototype.muteAudio;
    /** @type {?} */
    Stream.prototype.muteVideo;
    /** @type {?} */
    Stream.prototype.on;
    /** @type {?} */
    Stream.prototype.onClose;
    /** @type {?} */
    Stream.prototype.params;
    /** @type {?} */
    Stream.prototype.play;
    /** @type {?} */
    Stream.prototype.player;
    /** @type {?} */
    Stream.prototype.removeEventListener;
    /** @type {?} */
    Stream.prototype.screen;
    /** @type {?} */
    Stream.prototype.screenAttributes;
    /** @type {?} */
    Stream.prototype.setScreenProfile;
    /** @type {?} */
    Stream.prototype.setVideoBitRate;
    /** @type {?} */
    Stream.prototype.setVideoFrameRate;
    /** @type {?} */
    Stream.prototype.setVideoProfile;
    /** @type {?} */
    Stream.prototype.setVideoProfileCustom;
    /** @type {?} */
    Stream.prototype.setVideoProfileCustomPlus;
    /** @type {?} */
    Stream.prototype.setVideoResolution;
    /** @type {?} */
    Stream.prototype.stop;
    /** @type {?} */
    Stream.prototype.streamLanyl;
    /** @type {?} */
    Stream.prototype.streamId;
    /** @type {?} */
    Stream.prototype.unmuteAudio;
    /** @type {?} */
    Stream.prototype.unmuteVideo;
    /** @type {?} */
    Stream.prototype.url;
    /** @type {?} */
    Stream.prototype.video;
    /** @type {?} */
    Stream.prototype.videoEnabled;
    /** @type {?} */
    Stream.prototype.videoHeight;
    /** @type {?} */
    Stream.prototype.videoSize;
    /** @type {?} */
    Stream.prototype.videoWidth;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNO0NBeURMIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFN0cmVhbSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogYW55OyAvLyBmdW5jdGlvblxuICAgIGF1ZGlvOiBib29sZWFuO1xuICAgIGF1ZGlvRW5hYmxlZDogYm9vbGVhbjtcbiAgICBhdWRpb0xldmVsSGVscGVyOiBhbnkgLy8gP1xuICAgIGF1eF9zdHJlYW06IGFueTsgLy8gP1xuICAgIGNsb3NlOiBhbnk7IC8vIGZ1bmN0aW9uIFxuICAgIGRpc2FibGVBdWRpbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc2FibGVWaWRlbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc3BhdGNoRXZlbnQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNwYXRjaFNvY2tldEV2ZW50OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzcGF0Y2hlcjogYW55OyAvLyBldmVudCBsaXN0ZW5lclxuICAgIGVuYWJsZUF1ZGlvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZW5hYmxlVmlkZW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRBdHRyaWJ1dGVzOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2V0QXVkaW9MZXZlbDogYW55OyAvLyBmdW5jdGlvblxuICAgIGdldElkOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2V0U3RhdHM6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBoYXNBdWRpbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGhhc1NjcmVlbjogYW55OyAvLyBmdW5jdGlvblxuICAgIGhhc1ZpZGVvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaW5pdDogYW55OyAvLyBmdW5jdGlvblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgIGlzQXVkaW9PbjogYW55OyAvLyBmdW5jdGlvblxuICAgIGlzVmlkZW9PbjogYW55OyAvLyBmdW5jdGlvblxuICAgIGxvY2FsOiBib29sZWFuO1xuICAgIGxvd1N0cmVhbTogYW55OyAvLz9cbiAgICBtaXJyb3I6IGJvb2xlYW47XG4gICAgbXV0ZUF1ZGlvOiBhbnk7IC8vID9cbiAgICBtdXRlVmlkZW86IGFueTsgLy8gP1xuICAgIG9uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgb25DbG9zZTogYW55IC8vID9cbiAgICBwYXJhbXM6XG4gICAgICAgIHsgc3RyZWFtSUQ6IG51bWJlciwgYXVkaW86IGJvb2xlYW4sIGNhbWVyYUlkOiBzdHJpbmcsIG1pY3JvcGhvbmVJZDogc3RyaW5nLCB2aWRlbzogYm9vbGVhbiB9XG4gICAgcGxheTogYW55OyAvLyBmdW5jdGlvblxuICAgIHBsYXllcjogYW55OyAvLyA/XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogYW55OyAvLyBmdW5jdGlvblxuICAgIHNjcmVlbjogYm9vbGVhbjtcbiAgICBzY3JlZW5BdHRyaWJ1dGVzOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtYXhGcjogbnVtYmVyLCBtaW5GcjogbnVtYmVyIH1cbiAgICBzZXRTY3JlZW5Qcm9maWxlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9CaXRSYXRlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9GcmFtZVJhdGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb1Byb2ZpbGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb1Byb2ZpbGVDdXN0b206IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb1Byb2ZpbGVDdXN0b21QbHVzOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0VmlkZW9SZXNvbHV0aW9uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RvcDogYW55OyAvLyBmdW5jdGlvblxuICAgIHN0cmVhbUxhbnlsIC8vID9cbiAgICBzdHJlYW1JZDogbnVtYmVyO1xuICAgIHVubXV0ZUF1ZGlvOiBhbnk7IC8vID9cbiAgICB1bm11dGVWaWRlbzogYW55OyAvLyA/XG4gICAgdXJsOiBhbnk7IC8vP1xuICAgIHZpZGVvOiBib29sZWFuO1xuICAgIHZpZGVvRW5hYmxlZDogYm9vbGVhbjtcbiAgICB2aWRlb0hlaWdodDogbnVtYmVyO1xuICAgIHZpZGVvU2l6ZTogQXJyYXk8bnVtYmVyPlxuICAgIHZpZGVvV2lkdGg6IG51bWJlcjtcbn0iXX0=