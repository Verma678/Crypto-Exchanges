import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert position={"fixed"} status="error" bottom={"4"} left={"50%"} transform={"translateX(-50%)"} w={"container.lg"}>

      <AlertIcon></AlertIcon>
      {message}
    </Alert>
  )
}

export default ErrorComponent