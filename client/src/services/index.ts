const API_KEY = 'da91ffa5236ee2eca6d44819b94a5284'
const BASE_URL = 'http://api.openweathermap.org/data/2.5'

// https://api.openweathermap.org/data/2.5/onecall?lat= & lon= &exclude=current,minutely,hourly,alert&appid=da91ffa5236ee2eca6d44819b94a5284&units=metric

export const getWeatherData = (infoType: any, searchParams: any) => {
  const url = new URL(BASE_URL + '/' + infoType)
  //@ts-ignore
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });


  return fetch(url).then((response)=>response.json())
}




import axios from 'axios'
import { AiOutlineConsoleSql } from 'react-icons/ai'
const baseUrl = import.meta.env.VITE_SERVERURL
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})

export function register(data: any) {
  return axios.post(`${baseUrl}/users/signup`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function login(data: any) {
  return axios.post(`${baseUrl}/users/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCookie(data: any) {
  return axios.post(`${baseUrl}/users/getCookie`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  //console.log("INSIDE AXIOS FUNCTION")
  //console.log(data)
  return api.post('/users/getCookie', data)
}

// GETS USER DATA

export function getUserData() {
  return axios.get(`${baseUrl}/users/me`, {
    withCredentials: true
  })
}

// more on withCredentials : true == https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
// if i am not wrong , it needs to be set as true is a 3rd party is creating a cookie for our domain
// withCredentials  never affects same-origin requests.

// FOR TESTING  : DONOT USE
export function accessCookie() {
  return axios.post(
    `${baseUrl}/cookies`,
    {},
    {
      withCredentials: true
    }
  )
}

export function setFirstlogin() {
  return axios.post(`${baseUrl}/users/toggleFistLogin`, {
    withCredentials: true
  })
}




