import { Button, Modal } from 'antd'
import React, { FC } from 'react'
import styles from './index.module.scss'
import RoundDeleteIcon from '../../../resources/icons/RoundDeleteIcon'

type DeleteModalTopicProps = {
  isDeleteModalOpen: boolean
  handleCancel: () => void
  handleDelete: () => void
  topicName?: string
}

type DeleteModalFooterProps = {
  handleDelete: () => void
  handleDiscard: () => void
}

const DeleteTopicModal: FC<DeleteModalTopicProps> = ({
  handleCancel,
  isDeleteModalOpen,
  handleDelete,
  topicName,
}) => {
  return (
    <Modal
      width={720}
      title={<div className={styles.modalHeader}>Delete Topic</div>}
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      footer={
        <CreateTopicModalFooter
          handleDelete={handleDelete}
          handleDiscard={handleCancel}
        />
      }
    >
      <div className={styles.deleteTextWrapper}>
        <RoundDeleteIcon />

        <div>
          Are you sure you want to delete <strong>{topicName}</strong> ?
        </div>
      </div>
    </Modal>
  )
}

const CreateTopicModalFooter: FC<DeleteModalFooterProps> = ({
  handleDelete,
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
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  )
}

export default DeleteTopicModal
