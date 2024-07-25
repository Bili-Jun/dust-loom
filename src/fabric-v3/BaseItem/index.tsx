import { onMount } from 'solid-js'
import { capitalizeFirstLetter } from '../utils'

import styles from './style.module.css'

export interface IProps {
  onMounted?: () => void
  name?: string | 'page'
}

export default function BaseItem(props?: IProps) {
  const { name = 'page' } = props || {}
  onMount(() => {
    props?.onMounted?.()
  })
  return (
    <div class={styles['fabric-item']}>
      {capitalizeFirstLetter(name)}
    </div>
  )
}
