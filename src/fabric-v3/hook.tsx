import BaseItem, { IProps } from './BaseItem'

export function useBaseItemComponent(props?: IProps) {
  return <BaseItem {...props} />
}