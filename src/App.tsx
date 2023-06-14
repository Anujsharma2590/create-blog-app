import { FC } from 'react'
import styles from './index.module.scss'
import BlogEditor from './components/blogEditor'
import TabContainer from './components/mainPage'

const App: FC = () => {
  return (
    <div className={styles.mainContainer}>
      {/* <BlogEditor /> */}
      <TabContainer />
    </div>
  )
}

export default App
