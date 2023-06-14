import { Button, Modal, Form, Input, Select } from 'antd'
import React, { FC, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import styles from './index.module.scss'

import type { SelectProps } from 'antd'
import { TabpaneEnum, client } from '.'

const options: SelectProps['options'] = [
  { value: 'anuj', label: 'anuj sharma' },
  { value: 'rahul', label: 'Rahul kumar' },
]

type CreateModalTopicProps = {
  isModalOpen: boolean
  handleCancel: () => void
}

type DeleteModalFooterProps = {
  handleCreate: () => void
  handleDiscard: () => void
}

const CreateModalTopic: FC<CreateModalTopicProps> = ({
  isModalOpen,
  handleCancel,
}) => {
  const [topicName, setTopicName] = useState('')
  const [keywords, setKeywords] = useState('')

  const handleChange = (value: string) => {
    setKeywords(value)
  }

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value)
  }
  // {
  //   "id": "3",
  //   "topic": "React Hooks",
  //   "keywords": [
  //     "React",
  //     "Hooks"
  //   ],
  //   "content": "React Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.",
  //   "categories": "all"
  // },

  async function createTopic() {
    const id = uuidv4()
    const payload = {
      id,
      keywords,
      topic: topicName,
      content: '',
      categories: TabpaneEnum.Custom,
    }

    try {
      const response = await client.post('/blogs', payload)
      console.log('POST request successful:', response.data)
      handleCancel()
    } catch (error) {
      console.error('Error making POST request:', error)
    }
  }

  return (
    <Modal
      title="Create Topic"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <CreateTopicModalFooter
          handleCreate={createTopic}
          handleDiscard={handleCancel}
        />
      }
    >
      <div>
        <input
          type="text"
          className={styles.inputText}
          onChange={handleInputChnage}
          required
        />
        <span className={styles.floatingLabel}>Choose a topic name</span>
        <br />
        <br />

        <Select
          title="Select keywords"
          mode="tags"
          style={{ width: '100%' }}
          placeholder="keywords"
          onChange={handleChange}
          options={options}
        />
      </div>
    </Modal>
  )
}

const CreateTopicModalFooter: FC<DeleteModalFooterProps> = ({
  handleCreate,
  handleDiscard,
}) => {
  return (
    <div className={styles.footerBtnContainer}>
      <Button onClick={handleDiscard}>Cancel</Button>

      <Button type="primary" onClick={handleCreate}>
        Create
      </Button>
    </div>
  )
}

export default CreateModalTopic
