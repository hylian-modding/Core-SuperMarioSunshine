
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from './Imports';
import IMemory from "modloader64_api/IMemory";
import { QuestStatus } from "./QuestStatus";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { ISMSCore } from "../API/Imports";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    private core: ISMSCore;
    questStatus: QuestStatus;

    jsonFields: string[] = [
        "inventory",
        'questStatus',
        "swords",
        "shields",
        "eventFlags",
        "regionFlags",
        "liveFlags",
    ];

    constructor(emu: IMemory, core: ISMSCore) {
        super();
        this.emulator = emu;
        this.core = core;
        this.questStatus = new CORE.QuestStatus(emu, core);
    }
}