import React from 'react'
import { Button } from 'semantic-ui-react'

const CreateProductButton = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '12vh',
    right: '8vw',
  }

  return <Button circular icon='plus' color='olive' style={buttonStyle} />
}

export default CreateProductButton
