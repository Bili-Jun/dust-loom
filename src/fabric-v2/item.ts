import { Graphics, ColorSource, TextStyle, Text, FederatedPointerEvent } from 'pixi.js'
import {
  FABRIC_ITEM_DEFAULT_BORDER_COLOR,
  FABRIC_ITEM_DEFAULT_FILL_COLOR,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_DEFAULT_HEIGHT
} from './constant'

import {
  fabric
} from './store'

export type FabricItemId = [number, number]

export interface ICreateItemOptions {
  x: number
  y: number
  width?: number
  height?: number
  fill?: ColorSource
  borderColor?: ColorSource
}

export interface IFabricItem extends ICreateItemOptions {
  id: FabricItemId
  parentId?: FabricItemId
  destory: () => void
}

function onItemDragStart(_, context: Graphics) {
  fabric?.()?.stage?.on?.('pointermove', (event: FederatedPointerEvent) => onItemDragMove(event, context));
}

function onItemDragMove(event: FederatedPointerEvent, context: Graphics) {
  console.log(event.global)
  context.parent.toLocal(event.global, null, context.position);
}

// fabric?.()?.stage?.on?.('pointerup', onDragEnd);
// fabric?.()?.stage?.on?.('pointerupoutside', onDragEnd);

export function createItem (options: ICreateItemOptions): IFabricItem {
  const { x, y, width, height } = options;
  const graphics = new Graphics();

  let targetWidht = FABRIC_ITEM_DEFAULT_WIDTH;
  let targetHeight = FABRIC_ITEM_DEFAULT_HEIGHT;
  if (width as number >=0 ) {
    targetWidht = width as number;
  }

  if (height as number >= 0) {
    targetHeight = height as number;
  }

  graphics.lineStyle(2, FABRIC_ITEM_DEFAULT_BORDER_COLOR, 1);
  graphics.beginFill(FABRIC_ITEM_DEFAULT_FILL_COLOR);
  graphics.drawRect(x, y, targetWidht, targetHeight);
  graphics.endFill();

  graphics.eventMode = 'static';
  graphics.cursor

  const style = new TextStyle({
      fontSize: 18,
      fill: ['#ffffff'], // gradient
      wordWrap: true,
      wordWrapWidth: 440
  });

  const richText = new Text('unknow', style);
  richText.x = x + 8
  richText.y = y + 15


  graphics.addChild(richText)

  graphics.on('pointerdown', function(event) {
    onItemDragStart(event, this)
  }, graphics)
  

  fabric()?.stage.addChild(graphics);

  return {
    x,
    y,
    id: [x, y],
    destory() {
      fabric()?.stage.removeChild(graphics)
    }
  }
}
