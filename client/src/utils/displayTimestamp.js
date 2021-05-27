export const displayTimestamp = (timeNow, timePosted) => {
  // timePosted CANNOT be larger than timeNow

  const timePassedInSeconds = (timeNow - timePosted) / 1000

  // year
  if (timePassedInSeconds > 31536000) {
    if (Math.floor(timePassedInSeconds / 31536000) > 1) {
      return `${Math.floor(timePassedInSeconds / 31536000)} years ago`
    } else {
      return '1 year ago'
    }
  }

  // month
  if (timePassedInSeconds > 2415600 && timePassedInSeconds < 31536000) {
    if (Math.floor(timePassedInSeconds / 2415600) === 1) {
      return '1 month ago'
    } else {
      return `${Math.floor(timePassedInSeconds / 2415600)} months ago`
    }
  }

  // day
  if (timePassedInSeconds > 86400 && timePassedInSeconds < 2415600) {
    if (Math.floor(timePassedInSeconds / 86400) === 1) {
      return '1 day ago'
    } else {
      return `${Math.floor(timePassedInSeconds / 86400)} days ago`
    }
  }

  // hour
  if (timePassedInSeconds > 3600 && timePassedInSeconds < 86400) {
    if (Math.floor(timePassedInSeconds / 3600) === 1) {
      return '1 hour ago'
    } else {
      return `${Math.floor(timePassedInSeconds / 3600)} hours ago`
    }
  }

  // minute
  if (timePassedInSeconds > 60 && timePassedInSeconds < 36400) {
    if (Math.floor(timePassedInSeconds / 60) === 1) {
      return '1 minute ago'
    } else {
      return `${Math.floor(timePassedInSeconds / 60)} minutes ago`
    }
  }

  // second
  if (timePassedInSeconds < 60) {
    return 'less than a minute ago'
  }
}
