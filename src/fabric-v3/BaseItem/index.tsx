import { onMount } from 'solid-js'

import styles from './style.module.css'

export default function BaseItem(props) {
  onMount(() => {
    props?.onMounted?.()
  })
  return (
    <div class={styles['fabric-item']}>
      111
    </div>
  )
}
