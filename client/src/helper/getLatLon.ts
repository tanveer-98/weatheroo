import { useState } from 'react'

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    )
  })
}

export async function getLocation() {
  try {
    const position : any  = await getCurrentPosition()
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  } catch (error :any) {
    throw new Error('Error getting geolocation: ' + error.message)
  }
}