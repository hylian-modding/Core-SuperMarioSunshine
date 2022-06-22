import { Heap } from 'modloader64_api/heap';
import { ICore } from 'modloader64_api/IModLoaderAPI';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';

export const enum MarioState {
    STANDING,
    YAWNING,
    SLEEPING,
    WAKEUP,
    WALKRUN,
    SLIDING,
    TALKING,
    UNKNOWN
}
export interface IQuestStatus {

}

export interface IGlobalContext {
    current_scene_frame: number;
    current_scene_number: number;
    current_episode_number: number;
    prev_scene_number: number;
    prev_episode_number: number;
    next_scene_number: number;
    next_episode_number: number;
    marioPointer: number;
    game_state: number;
}

export interface ISaveContext {
    questStatus: IQuestStatus;
}

export interface IMario {
    pos: Buffer;
    rot: Buffer;
    accel_dir: number;
    unk1: number;
    unk2: number;
    base_accel: number;
    speed: number;
    state: MarioState;
    r_input: number;
    prev_state: number;
    substate: number;
    flags: number;
    fwd_spd: number;
    angles: number;
    health: number;
    inputs: number;
    fludd_angle: number;
    yoshi_state: number;
    flutter: number;
    juice_level: number;
    spray_mario: number;
    spray_yoshi: number;
    grab_target: number;
    sunglasses: number;
}

export interface ISMSHelper {
    isStageSelect(): boolean;
    isLoadingZone(): boolean;
    isMarioExists(): boolean;
    isTitleScreen(): boolean;
    isSceneNumberValid(): boolean;
    isMarioControllable(): boolean;
    isPaused(): boolean;
    isSceneChange(): boolean;
}

export enum SMSEvents {
    ON_SAVE_LOADED = 'onSaveLoaded',
    ON_SCENE_CHANGE = 'onSceneChange',
    ON_ROOM_CHANGE = 'onRoomChange',
    ON_LOADING_ZONE = 'onLoadingZone',
}

export interface ISMSCore extends ICore {
    heap?: Heap;
    global: IGlobalContext;
    mario: IMario;
    save: ISaveContext;
    helper: ISMSHelper;
}