/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class AgoraClient {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdvcmFDbGllbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWFnb3JhLXJ0Yy8iLCJzb3VyY2VzIjpbImxpYi9BZ29yYUNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTTtDQWtDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBZ29yYUNsaWVudCB7XG4gICAgYWVzTW9kZTogc3RyaW5nO1xuICAgIGFlc3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgY29uZmlnUHVibGlzaGVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZGlzYWJsZUR1YWxTdHJlYW06IGFueTsgLy8gZnVuY3Rpb25cbiAgICBlbmFibGVEdWFsU3RyZWFtOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgZ2F0ZXdheUNsaWVudDoge307IC8vIGFkZCBvYmplY3RcbiAgICBoaWdoU3RyZWFtOiBhbnk7IC8vID8gdHlwZVxuICAgIGhpZ2hTdHJlYW1TdGF0ZTogbnVtYmVyO1xuICAgIGluaXQ6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBpc0R1YWxTdHJlYW06IGJvb2xlYW47XG4gICAgam9pbjogYW55OyAvLyBmdW5jdGlvblxuICAgIGtleTogYW55OyAvLyA/IHN0cmluZ1xuICAgIGxlYXZlOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgbG93U3RyZWFtOiBhbnk7IC8vID9cbiAgICBsb3dTdHJlYW1QYXJhbWV0ZXI6IGFueSAvLyA/XG4gICAgbG93U3RyZWFtU3RhdGU6IG51bWJlcjtcbiAgICBvbjogYW55OyAvLyBmdW5jdGlvblxuICAgIHByb3h5U2VydmVyOiBhbnk7IC8vID9cbiAgICBwdWJsaXNoOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgcmVuZXdDaGFubmVsS2V5OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0RW5jcnlwdGlvbk1vZGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRFbmNyeXB0aW9uU2VjcmV0OiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0TGl2ZVRyYW5zY29kaW5nOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0TG93U3RyZWFtUGFyYW1ldGVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc2V0UHJveHlTZXJ2ZXI6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRSZW1vdGVWaWRlb1N0cmVhbVR5cGU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzZXRUdXJuU2VydmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RhcnRMaXZlU3RyZWFtaW5nOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgc3RvcExpdmVTdHJlYW1pbmc6IGFueTsgLy8gZnVuY3Rpb25cbiAgICBzdWJzY3JpYmU6IGFueTsgLy8gZnVuY3Rpb25cbiAgICB0dXJuU2VydmVyOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgdW5wdWJsaXNoOiBhbnk7IC8vIGZ1bmN0aW9uXG4gICAgdW5zdWJzY3JpYmU6IGFueTsgLy8gZnVuY3Rpb25cbiAgfSJdfQ==