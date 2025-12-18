import React from 'react'

const withLoading = WrappedComponent => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>
    } else {
      return <WrappedComponent {...props} />
    }
  }
}

export default withLoading
