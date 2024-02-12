import {
  Application,
  Container,
  IApplicationOptions
} from 'pixi.js';
import {
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_STAGE_BACKGROUND
} from './constant'
import { FabricItem, createFabricItem } from './item';

export type FabricCanvasOptions = Partial<IApplicationOptions>

export class FabricCanvas extends Application {
  private background: string = FABRIC_STAGE_BACKGROUND
  private initRootItem() {
    const { width, height } = this.view as HTMLCanvasElement
    const x = Math.floor(width / 4 - FABRIC_ITEM_DEFAULT_WIDTH / 2);
    const y = Math.floor(height / 4 - FABRIC_ITEM_DEFAULT_HEIGHT / 2);

    const rootItem = createFabricItem({
      x,
      y
    })
    this.rootContainer.addChild(rootItem)
  }

  public rootContainer = new Container()

  constructor(options: Partial<IApplicationOptions>) {
    super(options)
    this.background = this.background || FABRIC_STAGE_BACKGROUND
    this.resizeTo = window
    this.stage.eventMode = 'static'
    this.rootContainer.eventMode = 'static'
    this.initRootItem()
    this.stage.addChild(this.rootContainer)
  }
}

export class Fabric {
  private getFabricItems = (): FabricItem[]  => []

  get fabricData () {
    const items = this.getFabricItems() as FabricItem[]
    return items.map((item) => ({
      id: item.id,
      parentId: item.parentId
    }))
  }

  constructor(element: HTMLElement, options?: FabricCanvasOptions) {
    const fabricCanvas = new FabricCanvas({
      resolution: window.devicePixelRatio,
      ...options
    })

    element.appendChild(fabricCanvas.view as unknown as Node)
    this.getFabricItems = () => fabricCanvas.rootContainer.children as FabricItem[]
  }
}
