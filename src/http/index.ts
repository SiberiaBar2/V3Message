export const client = (url: string = '', method: string = 'GET', params?: unknown) => {
  console.log('import.meta.env.MODE', import.meta.env.MODE)
  const requestUrl =
    import.meta.env.MODE === 'production'
      ? `https://www.subjectservice.shop/${url}`
      : `http://localhost:3004/${url}`

  console.log('requestUrl', requestUrl)


  console.log('paramsparamsparams', params);
  
  return fetch(requestUrl, {
    method: method,
    headers: {
      'Content-Type': 'application/json' // 设置请求头，告诉服务器你发送的是JSON格式的数据
    },
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data====>', data)

      return data
    })
    .catch(console.error)
}
