import { AgoraConfig } from './AgoraConfig';
import { AgoraClient } from './AgoraClient';
export declare class AngularAgoraRtcService {
    private config;
    audioDevices: any[];
    videoDevices: any[];
    client: AgoraClient;
    constructor(config: AgoraConfig);
    checkSystemRequirements(): any;
    private getDevices();
    createClient(mode?: string): void;
    createStream(streamID: any, audio: boolean, cameraId: string, microphoneId: string, video: boolean, screen: boolean): any;
    logger(type: string, message: string): void;
}
