import { Graphics, ColorSource, TextStyle, Text, TextStyleFill } from 'pixi.js'
import {
  FABRIC_ITEM_DEFAULT_BORDER_COLOR,
  FABRIC_ITEM_DEFAULT_FILL_COLOR,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_FONT_COLOR,
  FABRIC_ITEM_TYPE,
  FABRIC_ITEM_DEFAULT_TEXT_VALUE
} from './constant'
import { generateId } from './utils'

export interface IFabricItemDrawStyleOptions {
  x: number
  y: number
  width?: number
  height?: number
  fill?: ColorSource
  borderColor?: ColorSource
}

export interface ICreateFabricItemOptions extends IFabricItemDrawStyleOptions {
  parentId?: string
  type?: FABRIC_ITEM_TYPE
  textFontColor?: string
  name?: string
}

export class FabricItemText extends Text {
  public id = Object.freeze(generateId())
  public parentId?: string

  constructor(...args: any) {
    super(...args)
  }
}

/**
 * 
 */
export class FabricItem extends Graphics {
  private getItemText() {
    return this.children.find(((subItem) => (subItem as FabricItemText).parentId === this.id)) as FabricItemText
  }
  public drawStyle(options: IFabricItemDrawStyleOptions) {
    const { x, y, width, height, fill, borderColor } = options;
    const targetFill = fill || FABRIC_ITEM_DEFAULT_FILL_COLOR
    const targetBorderColor = borderColor || FABRIC_ITEM_DEFAULT_BORDER_COLOR

    let targetWidht = FABRIC_ITEM_DEFAULT_WIDTH;
    let targetHeight = FABRIC_ITEM_DEFAULT_HEIGHT;
    if (width as number >=0 ) {
      targetWidht = width as number;
    }

    if (height as number >= 0) {
      targetHeight = height as number;
    }

    this.clear()
    this.lineStyle(2, targetBorderColor, 1);
    this.beginFill(targetFill);

    this.drawRect(x, y, targetWidht, targetHeight);
    this.endFill();
    const itemText = this.getItemText()
    itemText?.position?.set?.(x + 8, y + 15)
  }

  public type: FABRIC_ITEM_TYPE = FABRIC_ITEM_TYPE.COMPONENNT
  public id = Object.freeze(generateId())
  public parentId?: string

  get textFontColor() {
    const itemText = this.getItemText()
    return itemText.style.fill
  }

  set textFontColor(val: TextStyleFill) {
    const itemText = this.getItemText()
    itemText.style.fill = val
  }

  get itemName() {
    const itemText = this.getItemText()
    return itemText.text
  }

  set itemName(val: string) {
    const itemText = this.getItemText()
    itemText.text = val
  }

  constructor(...graphicsArgs: any) {
    super(...graphicsArgs)
  
    const style = new TextStyle({
      fontSize: 16,
      wordWrap: true,
      wordWrapWidth: 440
    });

    const itemText = new FabricItemText(FABRIC_ITEM_DEFAULT_TEXT_VALUE, style);
    itemText.parentId = this.id
    this.eventMode = 'static';

    this.addChild(itemText)
  }
}

/**
 * 
 * @param options 
 * @returns 
 */
export function createFabricItem (options: ICreateFabricItemOptions): FabricItem {
  const {
    x,
    y,
    width,
    height,
    textFontColor,
    fill,
    borderColor,
    type,
    parentId,
    name
  } = options;
  const item = new FabricItem()

  item.textFontColor = [textFontColor as string || FABRIC_ITEM_DEFAULT_FONT_COLOR]
  item.type = type as FABRIC_ITEM_TYPE || FABRIC_ITEM_TYPE.COMPONENNT
  item.parentId = parentId
  item.itemName = name as string || FABRIC_ITEM_DEFAULT_TEXT_VALUE
  item.drawStyle({
    x,
    y,
    width,
    height,
    fill,
    borderColor
  })

  return item
}
