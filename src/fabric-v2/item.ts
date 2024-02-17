import { Graphics, ColorSource, TextStyle, Text, TextStyleFill, Point } from 'pixi.js'
import {
  FABRIC_ITEM_DEFAULT_BORDER_COLOR,
  FABRIC_ITEM_DEFAULT_FILL_COLOR,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_FONT_COLOR,
  FABRIC_ITEM_TYPE,
  FABRIC_ITEM_DEFAULT_TEXT_VALUE,
  FABRIC_ITEM_TREE_LINE_COLOR
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
  parentPoint?: Point
  type?: FABRIC_ITEM_TYPE
  textFontColor?: string
  name?: string
}

export interface IFabricItemTreeLineOptions {
  x: number
  y: number
  visible: boolean
  first: boolean
}

export class FabricItemText extends Text {
  public id = Object.freeze(generateId())
  public parentId?: string

  constructor(...args: any) {
    super(...args)
  }
}

export class FabricItemTreeLine extends Graphics {
  public id = Object.freeze(generateId())
  public parentId?: string
  public draw(options: IFabricItemTreeLineOptions) {
    const { x, y, visible, first } = options
    this.clear()
    this.lineStyle(1, FABRIC_ITEM_TREE_LINE_COLOR, visible ? 1 : 0);
    this.moveTo(x - 10, first ? y - 4 : y - 36);
    this.lineTo(x - 10, y + 24);
    this.lineTo(x - 4, y + 24);

  }

  constructor(...args: any) {
    super(...args)
  }
}

/**
 * 
 */
export class FabricItem extends Graphics {
  private getItemText() {
    return this.children.find(((subItem) => (subItem as FabricItemText) instanceof FabricItemText)) as FabricItemText
  }

  private getItemTreeLine() {
    return this.children.find(((subItem) => (subItem as FabricItemTreeLine) instanceof FabricItemTreeLine)) as FabricItemTreeLine
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

    const itemTreeLine = this.getItemTreeLine()
    const parentPoint = this.parentPoint as Point
    console.log(y - parentPoint?.y - 12<= FABRIC_ITEM_DEFAULT_HEIGHT, y - parentPoint?.y, parentPoint?.y, y)
    itemTreeLine.draw({
      x,
      y,
      visible: this.parentId !== undefined,
      first: y - parentPoint?.y -12 <= FABRIC_ITEM_DEFAULT_HEIGHT
    })
  }

  public type: FABRIC_ITEM_TYPE = FABRIC_ITEM_TYPE.COMPONENNT
  public id = Object.freeze(generateId())
  public parentId?: string
  public parentPoint?: Point

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

    const treeLine = new FabricItemTreeLine()
    treeLine.parentId = this.id

    this.eventMode = 'static';

    this.cursor = 'grab'
    this.addChild(treeLine)
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
    parentPoint,
    name
  } = options;
  const item = new FabricItem()

  item.textFontColor = [textFontColor as string || FABRIC_ITEM_DEFAULT_FONT_COLOR]
  item.type = type as FABRIC_ITEM_TYPE || FABRIC_ITEM_TYPE.COMPONENNT
  item.parentId = parentId
  item.itemName = name as string || FABRIC_ITEM_DEFAULT_TEXT_VALUE
  item.parentPoint = parentPoint
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
