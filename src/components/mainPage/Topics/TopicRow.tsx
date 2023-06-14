import React, { FC } from 'react'
import styles from './index.module.scss'

import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { BlogListType } from '..'

type topicsArrayTypeProps = {
  data?: BlogListType
  onDelete: (id: string) => void
}

const TopicRow: FC<topicsArrayTypeProps> = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (data) {
      onDelete(data?.id)
    }
  }
  return (
    <div className={styles.topicRowConatiner}>
      <div>
        <div>{data ? data.topic : ''}</div>
        <div>
          {data && data.keywords.length > 0 ? (
            data.keywords.map((ele, index) => <span key={index}>{ele} </span>)
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <span className={styles.deleteIconWrapper} onClick={handleDelete}>
          <DeleteOutlined />
        </span>
        <Button>Write &gt;</Button>
      </div>
    </div>
  )
}

export default TopicRow
