import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState('')


  const passref=useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) str += "0123456789"
    if (characters) str += "!()*+,-./:;<=>?@^~"

    for (let i = 1; i <= length; i++) {
      let charc = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charc)
    }
    setPassword(pass)

  }, [length, numbers, characters, setPassword])
  useEffect(() => {
    passwordgenerator()

  }, [length, numbers, characters])


const copyclip=()=>{
  passref.current?.select()
  window.navigator.clipboard.writeText(password)


}

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passref}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
         onClick={copyclip}>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={4}
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numbers}
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"

            id="characterInput"
            onChange={() => {
              setCharacters((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
