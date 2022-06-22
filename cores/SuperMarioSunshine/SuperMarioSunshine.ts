import { onTick, Preinit, Init, Postinit } from "modloader64_api/PluginLifecycle";
import { IRomHeader } from 'modloader64_api/IRomHeader';
import { ModLoaderAPIInject } from "modloader64_api/ModLoaderAPIInjector";
import { IModLoaderAPI, ILogger, ICore, ModLoaderEvents } from "modloader64_api/IModLoaderAPI";
import { bus, EventHandler } from "modloader64_api/EventHandler";
import { PayloadType } from "modloader64_api/PayloadType";
import IMemory from "modloader64_api/IMemory";
import fs from 'fs';
import path from 'path';
import * as API from './API/Imports';
import { GlobalContext, Mario, SaveContext, SMSHelper } from "./src/Imports";
import * as CORE from './src/Imports';
import { BindVar, BindVar_Sizes } from 'modloader64_api/BindVar';

export class SuperMarioSunshine implements ICore, API.ISMSCore {
    heap_size = -1;
    heap_start = -1;
    header = "GMSE";
    @ModLoaderAPIInject()
    ModLoader: IModLoaderAPI = {} as IModLoaderAPI;
    eventTicks: Map<string, Function> = new Map<string, Function>();
    mario!: API.IMario;
    save!: API.ISaveContext;
    global!: API.IGlobalContext;
    helper!: API.ISMSHelper;
    isSaveLoaded = false;
    touching_loading_zone = false;
    last_known_scene: number = -1;
    last_known_room: number = -1;
    isMarioLoadingZone!: number;
    temp: boolean = false;
    isFirstTunic = false;
    spdHack = false;

    @Preinit(
    )
    preinit() {
        this.eventTicks.set('waitingForSaveload', () => {
            if (!this.isSaveLoaded && this.helper.isSceneNumberValid() && !this.helper.isTitleScreen() && this.helper.isMarioControllable()) {
                if(this.global.current_scene_number === 0) return;
                this.isSaveLoaded = true;
                bus.emit(API.SMSEvents.ON_SAVE_LOADED, {});
            }
        });
    }

    @Init()
    init(): void {
    }

    @Postinit()
    postinit(): void {
        this.global = new GlobalContext(this.ModLoader.emulator);
        this.mario = new Mario(this.ModLoader.emulator);
        this.save = new SaveContext(this.ModLoader.emulator, this);
        this.helper = new SMSHelper(
            this.save,
            this.global,
            this.mario,
            this.ModLoader.emulator
        );
        this.ModLoader.utils.setIntervalFrames(() => {

        }, 600);
    }

    @onTick()
    onTick() {
        if (this.helper.isTitleScreen() || !this.helper.isSceneNumberValid()) return;
        if(this.ModLoader.emulator.rdramRead32(0x8040E178) === 0) return;
        if (this.helper.isLoadingZone() && !this.touching_loading_zone) {
            console.log(`OnLoadingZone()`);
            bus.emit(API.SMSEvents.ON_LOADING_ZONE, {});
            this.touching_loading_zone = true;
        }
        if (this.touching_loading_zone && this.last_known_scene !== this.global.current_scene_number) {
            console.log(`OnSceneChange(): Scene ${this.global.next_scene_number.toString(16)}`);
            bus.emit(API.SMSEvents.ON_SCENE_CHANGE, this.global.next_scene_number);
            this.touching_loading_zone = false;
        }
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });
        this.last_known_scene = this.global.current_scene_number;
    }

    @EventHandler(API.SMSEvents.ON_SCENE_CHANGE)
    onSceneChange() {
        if (!this.isSaveLoaded || !this.helper.isSceneNumberValid() || this.helper.isTitleScreen()) return;


    }
}