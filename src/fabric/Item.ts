import { defaultItemHeight, defaultItemWidth, itemGap } from './constant'
import { getRootItemData, fabricContext } from './store'

export const enum ItemType {
  COMPONENT = 'component'
}
export interface IItemProps {
  x: number
  y: number
  width?: number
  height?: number
  type: ItemType
  text?: string
  level: number
  parentId: number
}

export interface IRenderOptions {
  x: number
  y: number
}

export default class Item {
  props: IItemProps
  constructor(props: IItemProps) {
    this.props = props
  }

  get style() {
    const styleMap = {
      component: {
        fillStyle: '#084272',
        strokeStyle: '#084272',
        fontColor: '#fff'
      }
    }

    return styleMap[this.props?.type || 'component']
  }

  get x() {
    return this.props?.x || 0
  }

  get y() {
    return this.props?.y || 0
  }

  renderText() {
    const { props, x, y, style } = this
    const ctx = fabricContext() as CanvasRenderingContext2D
    ctx.fillStyle = style.fontColor;
    ctx.font = '14px Menlo,Andale Mono,Ubuntu Mono,monospace'
    ctx.textBaseline = 'middle'
    const tx = x + 8
    const ty = y + 20
    ctx.fillText(props?.text || 'Unknow', tx, ty)
  }

  renderLevelLine() {
    const ctx = fabricContext() as CanvasRenderingContext2D
    const { props, x, y, style } = this

    if (props.parentId === -1) {
      return
    }

    const rootItemData = getRootItemData()
    const isFirstChildren = y === (rootItemData?.y as number) + defaultItemHeight + itemGap

    const targetX = x - 9
    ctx.strokeStyle = '#666'
    ctx.beginPath();
    ctx.moveTo(targetX, isFirstChildren ? y : y - defaultItemHeight / 2 - itemGap);
    ctx.lineTo(targetX, y + defaultItemHeight / 2);
    ctx.lineTo(targetX + 5, y + defaultItemHeight / 2);

  }

  clear() {
    const ctx = fabricContext() as CanvasRenderingContext2D
    const { props, x, y } = this
    const { width = defaultItemWidth, height = defaultItemHeight } = props

    const targetWidth = x + width
    const targetHeight = y + height
    ctx.clearRect(x, y, targetWidth, targetHeight)
  }

  createItemBase(options?: IRenderOptions) {
    const ctx = fabricContext() as CanvasRenderingContext2D
    const { props, x, y, style } = this
    this.props.x = options?.x || this.props.x
    this.props.y = options?.y || this.props.y
    const { width = defaultItemWidth, height = defaultItemHeight } = props
    const dpr = window.devicePixelRatio;

    const targetWidth = x + width
    const targetHeight = y + height

    ctx.save();
    ctx.fillStyle = style.fillStyle;
    ctx.strokeStyle = style.strokeStyle
    ctx.scale(dpr, dpr);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(targetWidth, y);
    ctx.lineTo(targetWidth, targetHeight);
    ctx.lineTo(x, targetHeight);
    ctx.fill()
    ctx.closePath();
  } 

  render(options?: IRenderOptions) {
    const ctx = fabricContext() as CanvasRenderingContext2D
    this.createItemBase(options)
    ctx.stroke();
    ctx.restore();
  }
}