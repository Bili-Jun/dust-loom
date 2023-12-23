type MainContext = CanvasRenderingContext2D | null

const store: any = {
  ctx: null
}

export function createFabric(options: { dom: { getContext: (arg0: string) => CanvasRenderingContext2D; }; }) {
  const ctx = options.dom?.getContext?.("2d") as CanvasRenderingContext2D;
  store.ctx = ctx
}

export function useContext() {
  return store.ctx
}

export class Fabric {
  ctx: MainContext = null
  options = {}
  constructor(ctx: MainContext, options: {}) {
    this.ctx = ctx
    this.options = options
  }
}
