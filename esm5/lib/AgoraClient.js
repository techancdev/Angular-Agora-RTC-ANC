/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AgoraClient = /** @class */ (function () {
    function AgoraClient() {
    }
    return AgoraClient;
}());
export { AgoraClient };
function AgoraClient_tsickle_Closure_declarations() {
    /** @type {?} */
    AgoraClient.prototype.aesMode;
    /** @type {?} */
    AgoraClient.prototype.aespassword;
    /** @type {?} */
    AgoraClient.prototype.configPublisher;
    /** @type {?} */
    AgoraClient.prototype.disableDualStream;
    /** @type {?} */
    AgoraClient.prototype.enableDualStream;
    /** @type {?} */
    AgoraClient.prototype.gatewayClient;
    /** @type {?} */
    AgoraClient.prototype.highStream;
    /** @type {?} */
    AgoraClient.prototype.highStreamState;
    /** @type {?} */
    AgoraClient.prototype.init;
    /** @type {?} */
    AgoraClient.prototype.isDualStream;
    /** @type {?} */
    AgoraClient.prototype.join;
    /** @type {?} */
    AgoraClient.prototype.key;
    /** @type {?} */
    AgoraClient.prototype.leave;
    /** @type {?} */
    AgoraClient.prototype.lowStream;
    /** @type {?} */
    AgoraClient.prototype.lowStreamParameter;
    /** @type {?} */
    AgoraClient.prototype.lowStreamState;
    /** @type {?} */
    AgoraClient.prototype.on;
    /** @type {?} */
    AgoraClient.prototype.proxyServer;
    /** @type {?} */
    AgoraClient.prototype.publish;
    /** @type {?} */
    AgoraClient.prototype.renewChannelKey;
    /** @type {?} */
    AgoraClient.prototype.setEncryptionMode;
    /** @type {?} */
    AgoraClient.prototype.setEncryptionSecret;
    /** @type {?} */
    AgoraClient.prototype.setLiveTranscoding;
    /** @type {?} */
    AgoraClient.prototype.setLowStreamParameter;
    /** @type {?} */
    AgoraClient.prototype.setProxyServer;
    /** @type {?} */
    AgoraClient.prototype.setRemoteVideoStreamType;
    /** @type {?} */
    AgoraClient.prototype.setTurnServer;
    /** @type {?} */
    AgoraClient.prototype.startLiveStreaming;
    /** @type {?} */
    AgoraClient.prototype.stopLiveStreaming;
    /** @type {?} */
    AgoraClient.prototype.subscribe;
    /** @type {?} */
    AgoraClient.prototype.turnServer;
    /** @type {?} */
    AgoraClient.prototype.unpublish;
    /** @type {?} */
    AgoraClient.prototype.unsubscribe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdvcmFDbGllbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy8iLCJzb3VyY2VzIjpbImxpYi9BZ29yYUNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBQTs7O3NCQUFBO0lBa0NHLENBQUE7QUFsQ0gsdUJBa0NHIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFnb3JhQ2xpZW50IHtcbiAgICBhZXNNb2RlOiBzdHJpbmc7XG4gICAgYWVzcGFzc3dvcmQ6IHN0cmluZztcbiAgICBjb25maWdQdWJsaXNoZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBkaXNhYmxlRHVhbFN0cmVhbTogYW55OyAvLyBmdW5jdGlvblxuICAgIGVuYWJsZUR1YWxTdHJlYW06IGFueTsgLy8gZnVuY3Rpb25cbiAgICBnYXRld2F5Q2xpZW50OiB7fTsgLy8gYWRkIG9iamVjdFxuICAgIGhpZ2hTdHJlYW06IGFueTsgLy8gPyB0eXBlXG4gICAgaGlnaFN0cmVhbVN0YXRlOiBudW1iZXI7XG4gICAgaW5pdDogYW55OyAvLyBmdW5jdGlvblxuICAgIGlzRHVhbFN0cmVhbTogYm9vbGVhbjtcbiAgICBqb2luOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAga2V5OiBhbnk7IC8vID8gc3RyaW5nXG4gICAgbGVhdmU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBsb3dTdHJlYW06IGFueTsgLy8gP1xuICAgIGxvd1N0cmVhbVBhcmFtZXRlcjogYW55IC8vID9cbiAgICBsb3dTdHJlYW1TdGF0ZTogbnVtYmVyO1xuICAgIG9uOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgcHJveHlTZXJ2ZXI6IGFueTsgLy8gP1xuICAgIHB1Ymxpc2g6IGFueTsgLy8gZnVuY3Rpb25cbiAgICByZW5ld0NoYW5uZWxLZXk6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRFbmNyeXB0aW9uTW9kZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldEVuY3J5cHRpb25TZWNyZXQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRMaXZlVHJhbnNjb2Rpbmc6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRMb3dTdHJlYW1QYXJhbWV0ZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRQcm94eVNlcnZlcjogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFJlbW90ZVZpZGVvU3RyZWFtVHlwZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHNldFR1cm5TZXJ2ZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdGFydExpdmVTdHJlYW1pbmc6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdG9wTGl2ZVN0cmVhbWluZzogYW55OyAvLyBmdW5jdGlvblxuICAgIHN1YnNjcmliZTogYW55OyAvLyBmdW5jdGlvblxuICAgIHR1cm5TZXJ2ZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICB1bnB1Ymxpc2g6IGFueTsgLy8gZnVuY3Rpb25cbiAgICB1bnN1YnNjcmliZTogYW55OyAvLyBmdW5jdGlvblxuICB9Il19