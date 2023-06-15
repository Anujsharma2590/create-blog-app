import React, { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Modal, Select, message } from 'antd'
import type { SelectProps } from 'antd'
import { TabpaneEnum, client } from '.'

import styles from './index.module.scss'

const options: SelectProps['options'] = [
  { value: 'online presence', label: 'online presence' },
  { value: 'small businesses', label: 'small businesses' },
  { value: 'digital marketing', label: 'digital marketing' },
  { value: 'branding', label: 'branding' },
  { value: 'website design', label: 'website design' },
  { value: 'logo design', label: 'logo design' },
  { value: 'tips', label: 'tips' },
  { value: 'social media management', label: 'social media management' },
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
  const [keywordList, setKeywordList] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (value: string[]) => {
    setKeywordList(value)
  }

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value)
    setErrorMessage('')
  }

  async function createTopic() {
    if (topicName.trim() === '') {
      setErrorMessage('Please enter topic name.')
    } else {
      setErrorMessage('')

      const id = uuidv4()
      const payload = {
        id,
        keywords: keywordList,
        topic: topicName,
        content: '',
        categories: TabpaneEnum.Custom,
      }

      try {
        const response = await client.post('/blogs', payload)
        if (response.data) {
          message.success('Blog topic has been created successfully', 2)
        }
        setTopicName('')
        setKeywordList([])
        handleCancel()
      } catch (error) {
        message.error('Error in creating the topic', 2)
        console.error('Error making POST request:', error)
      }
    }
  }

  return (
    <Modal
      width={720}
      title={<div className={styles.modalHeader}>Create Topic</div>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <CreateTopicModalFooter
          handleCreate={createTopic}
          handleDiscard={handleCancel}
        />
      }
    >
      <div className={styles.modalContentWrapper}>
        <input
          type="text"
          className={styles.inputText}
          onChange={handleInputChnage}
          required
          value={topicName}
        />
        <span className={styles.floatingLabel}>Choose a topic name</span>
        {errorMessage ? (
          <div className={styles.errorMessageText}>{errorMessage}</div>
        ) : (
          <></>
        )}

        <div className={styles.keywordLabel}>Keywords:</div>

        <Select
          title="Select keywords"
          placeholder="Select or Enter keywords"
          mode="tags"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={options}
          size={'large'}
          value={keywordList}
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
      <Button size="large" onClick={handleDiscard}>
        Cancel
      </Button>

      <Button
        style={{ background: '#E65027', color: 'white' }}
        size="large"
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  )
}

export default CreateModalTopic
