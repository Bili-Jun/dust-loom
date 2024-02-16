import {
  Application,
  Container,
  FederatedPointerEvent,
  IApplicationOptions,
  Point
} from 'pixi.js';
import {
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_ROOT_TEXT_VALUE,
  FABRIC_ITEM_TYPE,
  FABRIC_STAGE_BACKGROUND
} from './constant'
import { FabricItem, createFabricItem, ICreateFabricItemOptions } from './item';
import { copyPoint } from './utils';

export type FabricCanvasOptions = Partial<IApplicationOptions>

export class FabricCanvas extends Application {
  private background: string = FABRIC_STAGE_BACKGROUND
  private activeFabricItem?: FabricItem
  private pointerdownPosition: Point = new Point(0, 0);
  private activeFabricItemOriginalPoint: Point = new Point(0, 0);
  private initRootItem() {
    const { width, height } = this.view as HTMLCanvasElement
    const x = Math.floor(width / 4 - FABRIC_ITEM_DEFAULT_WIDTH / 2);
    const y = Math.floor(height / 4 - FABRIC_ITEM_DEFAULT_HEIGHT / 2);

    const rootItem = createFabricItem({
      x,
      y,
      name: FABRIC_ITEM_ROOT_TEXT_VALUE
    })
    this.rootContainer.addChild(rootItem)
  }

  public rootContainer = new Container()

  get rootNodeItem() {
    return this.rootContainer.children.find((item) => !(item as FabricItem).parentId) as FabricItem
  }

  get nextItemComponentPointer() {
    const itemComponennts = this.rootContainer.children.filter((item) => (item as FabricItem).type === FABRIC_ITEM_TYPE.COMPONENNT)
    const { x, y } = this.rootNodeItem?.getLocalBounds()
    const point = new Point(x + 24, y + itemComponennts.length * (FABRIC_ITEM_DEFAULT_HEIGHT + 12))

    return point
  }

  constructor(options: Partial<IApplicationOptions>) {
    super(options)
    this.background = this.background || FABRIC_STAGE_BACKGROUND
    this.resizeTo = window
    this.stage.eventMode = 'static'
    this.rootContainer.eventMode = 'static'
    this.initRootItem()
    this.stage.addChild(this.rootContainer)

    this.stage.on(
      'pointerdown',
      (event: FederatedPointerEvent) => {
        const globalPos = event.global;
        this.pointerdownPosition = copyPoint(globalPos);

        if (event.target === this.activeFabricItem) {
          return
        }

        if (event.target instanceof FabricItem) {
          this.activeFabricItem = event.target
          this.activeFabricItemOriginalPoint = copyPoint(event.target.position)
        }
      }
    )

    this.stage.on(
      'pointermove',
      (event) => {
        const globalPos = event.global;
        if (this.activeFabricItem) {
          // 拖拽单个对象
          const startPoint = this.rootContainer.localTransform
            .clone()
            .applyInverse(this.pointerdownPosition);
          const curPoint = this.rootContainer.localTransform
            .clone()
            .applyInverse(globalPos);
          const dx = curPoint.x - startPoint.x;
          const dy = curPoint.y - startPoint.y;

          const { x: originalX, y: originalY } = this.activeFabricItemOriginalPoint;
          this.activeFabricItem.position.set(originalX + dx, originalY + dy);
          this.activeFabricItem.updateTransform();
        }
      }
    )

    const handlePointUp = () => {
      this.activeFabricItem = undefined
    }

    this.stage.on(
      'pointerup',
      handlePointUp
    )

    this.stage.on(
      'pointerupoutside',
      handlePointUp
    )
  }
}

export class Fabric {
  private getFabricItems = (): FabricItem[]  => []
  public addItem = (options: Partial<ICreateFabricItemOptions>) => {}

  get fabricData () {
    const items = this.getFabricItems() as FabricItem[]
    return items.map((item) => ({
      id: item.id,
      parentId: item.parentId,
      name: item.itemName
    }))
  }

  constructor(element: HTMLElement, options?: FabricCanvasOptions) {
    const fabricCanvas = new FabricCanvas({
      resolution: window.devicePixelRatio,
      ...options
    })

    element.appendChild(fabricCanvas.view as unknown as Node)
    this.getFabricItems = () => fabricCanvas.rootContainer.children as FabricItem[]

    this.addItem = (options: Partial<ICreateFabricItemOptions>) => {
      const { x, y } = fabricCanvas.nextItemComponentPointer
      const parentId = options.parentId || fabricCanvas.rootNodeItem.id
      const item = createFabricItem({
        x: options.x !== undefined ? options.x : x,
        y: options.y !== undefined ? options.y : y,
        parentId,
        ...options
      })

      fabricCanvas.rootContainer.addChild(item)
    }
  }
}
