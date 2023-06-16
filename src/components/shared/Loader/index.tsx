import { Spin } from 'antd'
import styles from './index.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Spin tip="Loading" size="large" />
    </div>
  )
}

export default Loader
