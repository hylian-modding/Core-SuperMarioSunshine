import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import * as API from '../API/Imports';
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import IMemory from "modloader64_api/IMemory";

export class SMSHelper extends JSONTemplate implements API.ISMSHelper {
    private TMarDirector = 0x8040E178;
    private save: API.ISaveContext;
    private global: API.IGlobalContext;
    private mario: API.IMario;
    private emu: IMemory;
    constructor(
        save: API.ISaveContext,
        global: API.IGlobalContext,
        mario: API.IMario,
        memory: IMemory
    ) {
        super();
        this.save = save;
        this.global = global;
        this.mario = mario;
        this.emu = memory;
    }

    isMarioControllable(): boolean {
        let r1 = this.mario.state;
        return (r1 !== API.MarioState.TALKING && !this.isLoadingZone() && !this.isPaused());
    }

    isStageSelect(): boolean {
        return this.global.current_episode_number === -1;
    }

    isTitleScreen(): boolean {
        return this.global.current_scene_number === 0x0F;
    }

    isSceneChange(): boolean {
        let r1 = this.global.current_scene_frame;
        return (r1 === 60 * 4);
    }

    isLoadingZone(): boolean {
        return (this.global.game_state == 0x0 || this.global.game_state === 0x9) ;
    }

    isMarioExists(): boolean {
        return (this.global.marioPointer !== 0x0);
    }

    isSceneNumberValid(): boolean {
        return this.global.current_scene_number <= 0x3C && !this.isTitleScreen();
    }

    isPaused(): boolean {
        return this.global.game_state == 0x5;
    }

}