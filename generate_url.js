function randomLetter(string) {
  let randomNum = Math.floor(Math.random() * string.length ) 
  return string[randomNum]
}

function generateUrl() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const letters = lowerCaseLetters + upperCaseLetters + numbers

  let randomStr = ''
  for(let i = 0; i < 5; i++) {
    randomStr += randomLetter(letters)
  }

  return outputUrl = `http://localhost:3000/tinyURL/${randomStr}` 
}

module.exports = generateUrl