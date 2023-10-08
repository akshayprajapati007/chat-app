export const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) reject("Error")
      else resolve(reader.result as string)
    }

    reader.onerror = (error) => reject("Error" + error)
  })
}
