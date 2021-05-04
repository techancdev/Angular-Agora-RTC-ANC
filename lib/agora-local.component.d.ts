import { AngularAgoraRtcService } from './angular-agora-rtc.service';
import { Stream } from './Stream';
export declare class AgoraLocalComponent {
    private agoraService;
    activeCall: boolean;
    audioEnabled: boolean;
    videoEnabled: boolean;
    localStream: Stream;
    remoteCalls: any;
    constructor(agoraService: AngularAgoraRtcService);
    startCall(): void;
    private subscribeToStreams();
    leave(): void;
    toggleAudio(): void;
    toggleVideo(): void;
}
