import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const handleClick = (event, path, navigate) => {
  navigate(path)
  event.preventDefault()
}

const IconBreadcrumbs = ({ breadcrumbs }) => {
  const navigate = useNavigate()

  return (
    <div role="presentation" className='bredcrumbs'>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" sx={{ verticalAlign: 'middle', margin: 0 }} />}>
        {breadcrumbs.map(({ icon: Icon, label, path }, index) => (
          <Link
            key={index}
            to={path}
            onClick={(event) => handleClick(event, path, navigate)}
            underline="none"
            color="inherit"
            sx={{
              '&:hover': { cursor: 'pointer' },
              ...(index === breadcrumbs.length - 1 && { pointerEvents: 'none', color: 'text.disabled' })
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 4 }}>
              {Icon !== null && (
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'primary.main', padding: 0.5, borderRadius: 1, marginRight: 1 }}
                >
                  {/* Adjusted marginRight to reduce the gap */}
                  <Icon sx={{ color: 'white' }} fontSize="small" />
                </Box>
              )}
              <span>{label}</span>
            </Box>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  )
}

export default IconBreadcrumbs
