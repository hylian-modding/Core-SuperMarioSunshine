import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

export class Mario extends JSONTemplate implements API.IMario {
  private emulator: IMemory;
  private marioPtr = 0x8040E0E8;
  constructor(emu: IMemory) {
    super();
    this.emulator = emu;
  }

  get pos(): Buffer {
    return this.emulator.rdramReadPtrBuffer(this.marioPtr, 0x10, 0xC);
  }
  get rot(): Buffer {
    return this.emulator.rdramReadPtrBuffer(this.marioPtr, 0x30, 0xC);
  }

  get accel_dir(): number {
    return this.emulator.rdramReadPtr16(this.marioPtr, 0x90)
  } // acceleration direction
  get unk1(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x78)
  } // unknown
  get unk2(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0xEB8)
  } //  unknown
  get base_accel(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x8C) // base acceleration
  }

  get speed(): number {
    return this.emulator.rdramRead32(this.marioPtr);
  }

  get state(): API.MarioState {
    switch (this.emulator.rdramReadPtr32(this.marioPtr, 0x7C)) {
      case 0xC400201:
        return API.MarioState.STANDING;
      case 0xC400202:
        return API.MarioState.YAWNING;
      case 0xC000203:
        return API.MarioState.SLEEPING;
      case 0xC000204:
        return API.MarioState.WAKEUP;
      case 0x4000440:
        return API.MarioState.WALKRUN;
      case 0x10001308:
        return API.MarioState.TALKING;
    }
    return API.MarioState.UNKNOWN;
  }

  get r_input(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x1C);
  }

  get prev_state(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x80)
  }
  get substate(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x84)
  }
  get flags(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x118)
  }
  get fwd_spd(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0xB0)
  }
  get angles(): number {
    return this.emulator.rdramReadPtr16(this.marioPtr, 0x96)
  }
  get health(): number {
    return this.emulator.rdramReadPtr16(this.marioPtr, 0x120)
  }
  get inputs(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x74)
  }
  get fludd_angle(): number {
    let TWaterGunPointer = this.emulator.rdramReadPtr32(this.marioPtr, 0x3E4);
    return this.emulator.rdramReadPtr16(TWaterGunPointer, 0x37A);
  }
  get yoshi_state(): number {
    let TYoshi = this.emulator.rdramReadPtr32(this.marioPtr, 0x3F0);
    return this.emulator.rdramReadPtr8(TYoshi, 0);
  }
  get juice_level(): number {
    let TYoshi = this.emulator.rdramReadPtr32(this.marioPtr, 0x3F0);
    return this.emulator.rdramReadPtr32(TYoshi, 0xC)
  }
  get flutter(): number {
    let TYoshi = this.emulator.rdramReadPtr32(this.marioPtr, 0x3F0);
    return this.emulator.rdramReadPtr32(TYoshi, 0xB8)
  }
  get spray_mario(): number {
    let TWaterGunPointer = this.emulator.rdramReadPtr32(this.marioPtr, 0x3E4);
    return this.emulator.rdramReadPtr8(TWaterGunPointer, 0x715)
  }
  get spray_yoshi(): number {
    let TWaterGunPointer = this.emulator.rdramReadPtr32(this.marioPtr, 0x3E4);
    return this.emulator.rdramReadPtr8(TWaterGunPointer, 0x153D)
  }
  get grab_target(): number {
    return this.emulator.rdramReadPtr32(this.marioPtr, 0x384)
  }
  get sunglasses(): number {
    let TMarioCap = this.emulator.rdramReadPtr32(this.marioPtr, 0x3E0);
    return this.emulator.rdramReadPtr8(TMarioCap, 0x5)
  }

}