import { render } from 'solid-js/web'
import { Graph, Shape } from '@antv/x6'
import {
  DEFAULT_LOOM_FABRIC_CONTAINER_CLASSNAME,
  LOOM_FABRIC_CLASSNAME,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_SHAPE
} from "./constant"
import { isString } from "./utils"
import { useBaseItemComponent } from './hook'

import './style.css'

export const enum FabricItemType {
  Component = 'component',
  Action = 'action'
}

export interface IFabricOptions {
  container?: HTMLElement | string
}

export interface IAddFabricItemOptions {
  type: FabricItemType
  x?: number
  y?: number
  width?: number
  height?: number
  zIndex?: number
  data?: Object
  onMounted?: () => void
}

Shape.HTML.register({
  shape: FABRIC_ITEM_DEFAULT_SHAPE,
    width: FABRIC_ITEM_DEFAULT_WIDTH,
    height: FABRIC_ITEM_DEFAULT_HEIGHT,
    effect: ['data'],
    attrs: {
      body: {
        fill: 'none',
        stroke: 'none',
        refWidth: '100%',
        refHeight: '100%',
      },
    },
    html(cell) {
      const div = document.createElement('div')
      div.classList.add('fabric-item-view')
      cell.data?.onMounted?.()
      render(
        () => useBaseItemComponent({ a: 1 }),
        div
      )

      return div
    }
})


export class Fabric {
  private container: HTMLElement | null = null
  private rootElement: HTMLDivElement | null = null
  private graphInstance: Graph

  public static registerNode() {

  }

  constructor(options?: IFabricOptions) {
    const {
      container
    } = options as IFabricOptions
    this.container = container as HTMLElement
    if (isString(container)) {
      this.container = document.querySelector(container as string) as HTMLElement
    }

    if (!this.container) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
      
    }

    this.container.classList.add(DEFAULT_LOOM_FABRIC_CONTAINER_CLASSNAME)

    this.rootElement = document.createElement('div')
    this.rootElement.classList.add(LOOM_FABRIC_CLASSNAME)
    this.container.appendChild(this.rootElement)

    this.graphInstance = new Graph({
      container: this.rootElement,
      autoResize: true,
    })

    // 获取画布的宽度和高度
    // const content = this.graphInstance.getContentBBox();
    // debugger


    // 计算居中坐标
    // const centerX = width / 2;
    // const centerY = height / 2;


    const item = this.addItem({
      type: FabricItemType.Component,
    })

    setTimeout(() => {
      this.graphInstance.centerContent()
    }, 100)
    // this.graphInstance.zoomToFit({ maxScale: 0.8 })
  }

  addItem(options: IAddFabricItemOptions) {
    const {
      x,
      y,
      type,
      width,
      height,
      zIndex,
      onMounted
    } = options

    const item = this.graphInstance.addNode({
      type: type || 'component',
      x,
      y,
      width,
      height,
      shape: FABRIC_ITEM_DEFAULT_SHAPE,
      zIndex,
      data: {
        onMounted
      },
    })

    return item
  }
}