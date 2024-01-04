import { defaultItemHeight, defaultItemWidth, itemGap } from './constant'
import { getRootItemData } from './store'

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
  parentId: number
}

export default class Item {
  ctx: CanvasRenderingContext2D
  props: IItemProps
  constructor(ctx: CanvasRenderingContext2D, props: IItemProps) {
    this.ctx = ctx
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
    const { ctx, props, x, y, style } = this
    ctx.fillStyle = style.fontColor;
    ctx.font = '14px Menlo,Andale Mono,Ubuntu Mono,monospace'
    ctx.textBaseline = 'middle'
    const tx = x + 8
    const ty = y + 20
    ctx.fillText(props?.text || 'Unknow', tx, ty)
  }

  renderLevelLine() {
    const { ctx, props, x, y, style } = this

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
    ctx.stroke();
  }

  render() {
    const { ctx, props, style, x, y } = this
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
    ctx.stroke();

    this.renderText()
    this.renderLevelLine()
    this.ctx.restore();
  }
}