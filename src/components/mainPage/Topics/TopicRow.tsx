import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { BlogListType } from '..'
import { DeleteIcon } from '../../../resources/icons/DeleteIcon'

import styles from './index.module.scss'
import DeleteTopicModal from './DeleteTopicModal'

type topicsArrayTypeProps = {
  data?: BlogListType
  onDelete: (id: string) => void
}

enum keywordTag {
  onlinePresence = 'onlinePresence',
  smallBusinesses = 'smallBusinesses',
  digitalMarketing = 'digitalMarketing',
  branding = 'branding',
  websiteDesign = 'websiteDesign',
  logoDesign = 'logoDesign',
  tips = 'tips',
  socialMediaManagement = 'socialMediaManagement',
}

const TopicRow: FC<topicsArrayTypeProps> = ({ data, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (data) {
      onDelete(data?.id)
      setIsDeleteModalOpen(false)
    }
  }
  function handleNavigate() {
    if (data) {
      navigate(`/${data.id}`)
    }
  }

  function navigateToViewBlog() {
    if (!data?.content) {
      return
    }
    if (data) {
      navigate(`/view/${data.id}`)
    }
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const showModal = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <div className={styles.topicRowConatiner}>
      <div>
        <div
          className={styles.topicHeading}
          style={{ cursor: data?.content ? 'pointer' : '' }}
          onClick={navigateToViewBlog}
        >
          {data ? data.topic : ''}
        </div>

        <div className={styles.keywordWrapperContainer}>
          {data && data.keywords.length > 0 ? (
            data.keywords.map((ele, index) => (
              <span
                className={` ${styles.common} ${
                  styles[generateStatusColorClassName(toCamelCase(ele))]
                }`}
              >
                <span key={index}>{ele} </span>
              </span>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.CustomContainer}>
        <span className={styles.deleteIconWrapper} onClick={showModal}>
          <DeleteIcon />
        </span>
        <Button
          style={{ background: '#E65027', color: 'white' }}
          onClick={handleNavigate}
        >
          {data?.content ? 'Edit' : ' Write'} &gt;
        </Button>
      </div>
      <DeleteTopicModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        topicName={data?.topic}
      />
    </div>
  )
}

export default TopicRow

function toCamelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function generateStatusColorClassName(keyword: string) {
  if (!keyword) return ''

  switch (keyword) {
    case keywordTag.onlinePresence:
      return 'onlinePresence'
    case keywordTag.smallBusinesses:
      return 'smallBusinesses'
    case keywordTag.digitalMarketing:
      return 'digitalMarketing'
    case keywordTag.branding:
      return 'branding'
    case keywordTag.websiteDesign:
      return 'websiteDesign'
    case keywordTag.logoDesign:
      return 'logoDesign'
    case keywordTag.tips:
      return 'tips'
    case keywordTag.socialMediaManagement:
      return 'socialMediaManagement'
    default:
      return 'statusTag'
  }
}
