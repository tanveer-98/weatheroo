# Was facing issue with httpOnly cookie which was fixed only after using proxy in vite server

# VIte proxy option is for only dev purpose , wont' work for production . A workaround is to use ngnix for proxy else you wont be able to do sameSite=strict

# if sameSite is set to None then it leads to vulnerabilities as your  cookies can be used by any other site other than your actual client site 