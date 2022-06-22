
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { SaveContext } from './SaveContext';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { Flag, FlagManager } from "modloader64_api/FlagManager";
import { ISMSCore } from "../API/Imports";


export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private emulator: IMemory;

    constructor(emu: IMemory, core: ISMSCore) {
        super();
        this.emulator = emu;
    }

    jsonFields: string[] = [

    ];

}