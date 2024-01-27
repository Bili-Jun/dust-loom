import * as PIXI from 'pixi.js';
import {
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_STAGE_BACKGROUND
} from './constant'
import { addFabricDataItem, useFabric } from './store';
import { createItem } from './item';


export interface ICreateFabricOptions {
  stageBackground?: PIXI.ColorSource
}

export function initRootNode(rootElement: HTMLElement | HTMLDivElement) {
  const { width, height } = rootElement?.getBoundingClientRect?.();
  const x = Math.floor(width / 2 - FABRIC_ITEM_DEFAULT_WIDTH / 2);
  const y = Math.floor(height / 2 - FABRIC_ITEM_DEFAULT_HEIGHT / 2);
  addFabricDataItem(createItem({
    x,
    y 
  }))
  
}

export function createFabric(element: HTMLElement, options: ICreateFabricOptions) {
  const app = new PIXI.Application({
    background: options.stageBackground || FABRIC_STAGE_BACKGROUND,
    resizeTo: window,
  });

  element.appendChild(app.view as unknown as Node)

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  useFabric(app)

  initRootNode(element)
}