import React, { useState } from 'react'
import './issue.css'
import CustomTabs from '../shared/common/CustomTabs'
import { STRING, homeTab } from '../../constants/static'
import CustomModal from '../shared/common/CustomModal'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import Loader from '../shared/common/Loader'

const IssueDetailsPage = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="container-fluid">
      <h3>Issues Details Page</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="custom-box p-3">{/* Content in the left column */}</div>
        </div>
        <div className="col-md-8">
          <div className="custom-box ">
            <CustomTabs tabs={homeTab} defaultTab={STRING.CREATE_REPORT} tabName={STRING.ACTIVE} />
            <div className="p-3">
              <div className="fs-5 bold fw-bold">Customer Report History</div>
              <div className="customer-report d-flex flex-row justify-content-between">
                <div>hello</div>
                <div>
                  <button className="btn" onClick={handleOpenModal}>
                    <MdOutlineRemoveRedEye color="white" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the modal component */}
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        position="right" // Set the desired position
      >
        {/* Content inside the modal */}
        <p>This is the content of the modal.</p>
        <Loader />
      </CustomModal>
    </div>
  )
}

export default IssueDetailsPage
