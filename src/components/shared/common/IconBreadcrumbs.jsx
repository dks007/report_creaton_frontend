import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

const handleClick = (event, path) => {
  const navigate = useNavigate()
  navigate(path)
  event.preventDefault()
}

const IconBreadcrumbs = ({ breadcrumbs }) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map(({ icon: Icon, label, path }, index) => (
          <Link
            key={index}
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href={path}
            onClick={(event) => handleClick(event, path)}
          >
            {Icon !== null && <Icon sx={{ mr: 0.5, marginBottom: 1 }} fontSize="medium" />}

            {label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  )
}

export default IconBreadcrumbs
