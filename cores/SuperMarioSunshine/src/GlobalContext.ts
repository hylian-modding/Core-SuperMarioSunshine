import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

export class GlobalContext extends JSONTemplate implements API.IGlobalContext {
    private emulator: IMemory;
    private TMarDirector = 0x8040E178;
    private TApplication = 0x803E9700;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    get game_state(): number {
        return this.emulator.rdramReadPtr8(this.TMarDirector, 0x64);
    }
    get current_scene_frame(): number {
        return this.emulator.rdramReadPtr8(this.TMarDirector, 0x0058);
    }

    get prev_scene_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0xA);
    }
    get prev_episode_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0xB);
    }

    get current_scene_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0xE);
    }
    get current_episode_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0xF);
    }
    get next_scene_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0x12);
    }
    get next_episode_number(): number {
        return this.emulator.rdramRead8(this.TApplication + 0x13);
    }

    get marioPointer(): number {
        return this.emulator.rdramRead32(0x8040E0E8);
    }
}