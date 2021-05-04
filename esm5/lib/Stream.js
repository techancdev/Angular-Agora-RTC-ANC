/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Stream = /** @class */ (function () {
    function Stream() {
    }
    return Stream;
}());
export { Stream };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBOzs7aUJBQUE7SUF5REMsQ0FBQTtBQXpERCxrQkF5REMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RyZWFtIHtcbiAgICBhZGRFdmVudExpc3RlbmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgYXVkaW86IGJvb2xlYW47XG4gICAgYXVkaW9FbmFibGVkOiBib29sZWFuO1xuICAgIGF1ZGlvTGV2ZWxIZWxwZXI6IGFueSAvLyA/XG4gICAgYXV4X3N0cmVhbTogYW55OyAvLyA/XG4gICAgY2xvc2U6IGFueTsgLy8gZnVuY3Rpb24gXG4gICAgZGlzYWJsZUF1ZGlvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzYWJsZVZpZGVvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzcGF0Y2hFdmVudDogYW55OyAvLyBmdW5jdGlvblxuICAgIGRpc3BhdGNoU29ja2V0RXZlbnQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNwYXRjaGVyOiBhbnk7IC8vIGV2ZW50IGxpc3RlbmVyXG4gICAgZW5hYmxlQXVkaW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBlbmFibGVWaWRlbzogYW55OyAvLyBmdW5jdGlvblxuICAgIGdldEF0dHJpYnV0ZXM6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRBdWRpb0xldmVsOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2V0SWQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnZXRTdGF0czogYW55OyAvLyBmdW5jdGlvblxuICAgIGhhc0F1ZGlvOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaGFzU2NyZWVuOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaGFzVmlkZW86IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpbml0OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgaXNBdWRpb09uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgaXNWaWRlb09uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgbG9jYWw6IGJvb2xlYW47XG4gICAgbG93U3RyZWFtOiBhbnk7IC8vP1xuICAgIG1pcnJvcjogYm9vbGVhbjtcbiAgICBtdXRlQXVkaW86IGFueTsgLy8gP1xuICAgIG11dGVWaWRlbzogYW55OyAvLyA/XG4gICAgb246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBvbkNsb3NlOiBhbnkgLy8gP1xuICAgIHBhcmFtczpcbiAgICAgICAgeyBzdHJlYW1JRDogbnVtYmVyLCBhdWRpbzogYm9vbGVhbiwgY2FtZXJhSWQ6IHN0cmluZywgbWljcm9waG9uZUlkOiBzdHJpbmcsIHZpZGVvOiBib29sZWFuIH1cbiAgICBwbGF5OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgcGxheWVyOiBhbnk7IC8vID9cbiAgICByZW1vdmVFdmVudExpc3RlbmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2NyZWVuOiBib29sZWFuO1xuICAgIHNjcmVlbkF0dHJpYnV0ZXM6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG1heEZyOiBudW1iZXIsIG1pbkZyOiBudW1iZXIgfVxuICAgIHNldFNjcmVlblByb2ZpbGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb0JpdFJhdGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb0ZyYW1lUmF0ZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZUN1c3RvbTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFZpZGVvUHJvZmlsZUN1c3RvbVBsdXM6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRWaWRlb1Jlc29sdXRpb246IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdG9wOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RyZWFtTGFueWwgLy8gP1xuICAgIHN0cmVhbUlkOiBudW1iZXI7XG4gICAgdW5tdXRlQXVkaW86IGFueTsgLy8gP1xuICAgIHVubXV0ZVZpZGVvOiBhbnk7IC8vID9cbiAgICB1cmw6IGFueTsgLy8/XG4gICAgdmlkZW86IGJvb2xlYW47XG4gICAgdmlkZW9FbmFibGVkOiBib29sZWFuO1xuICAgIHZpZGVvSGVpZ2h0OiBudW1iZXI7XG4gICAgdmlkZW9TaXplOiBBcnJheTxudW1iZXI+XG4gICAgdmlkZW9XaWR0aDogbnVtYmVyO1xufSJdfQ==