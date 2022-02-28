import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IZ64Main } from 'Z64Lib/API/Common/IZ64Main';
import { Color3 } from './Color3';

const GAUNTADDR = 0xF7AE4;

let colorTargets : Color3[] = [
  new Color3(255, 0, 255),
  new Color3(255, 0, 0),
  new Color3(255, 255, 0),
  new Color3(0, 255, 0),
  new Color3(0, 255, 255),
  new Color3(0, 0, 255),
  new Color3(255, 0, 255)
];
let currentTarget = 0;
let currentColor = new Color3();
let velocity = 15;

export class RainbowEverything implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'RainbowEverything';

  @InjectCore() core!: IZ64Main;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}

  onTick(): void
  {
    //this.ModLoader.emulator.rdramWrite32(global.ModLoader.save_context + 0x4, 0); Force Adult Link
    let SilverOffset = GAUNTADDR + ( 0 * 3);
    let GoldOffset = GAUNTADDR + ( 1 * 3);

    this.ModLoader.emulator.rdramWrite32(0x80064BB8, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064BF4, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064BF8, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064C48, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064C6C, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064C80, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064C84, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B08, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B0C, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B10, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B14, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B18, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B3C, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B48, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B54, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B60, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064BAC, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064BB4, 0);
    this.ModLoader.emulator.rdramWrite32(0x80064B04, 0);
    // this.ModLoader.emulator.rdramWrite32(0x80075828, 0);

    var rScalar = colorTargets[currentTarget].r == 255 ? 1 : -1;
    var gScalar = colorTargets[currentTarget].g == 255 ? 1 : -1;
    var bScalar = colorTargets[currentTarget].b == 255 ? 1 : -1;

    currentColor.r = currentColor.r + (velocity * rScalar);
    currentColor.g = currentColor.g + (velocity * gScalar);
    currentColor.b = currentColor.b + (velocity * bScalar);

    currentColor = currentColor.clamped();

    let halfColor = currentColor.mul(0.5);
    let goodAlpha = Math.floor(Math.pow(currentColor.r * currentColor.r + currentColor.g * currentColor.g + currentColor.b * currentColor.b, 0.5));

    if (currentColor.r == colorTargets[currentTarget].r
      && currentColor.g == colorTargets[currentTarget].g
      && currentColor.b == colorTargets[currentTarget].b) currentTarget = (currentTarget + 1) % (colorTargets.length - 1);

    this.ModLoader.emulator.rdramWriteBuffer(SilverOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
    this.ModLoader.emulator.rdramWriteBuffer(GoldOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));

  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED)
  onClient_InjectFinished(evt: any) {}
}