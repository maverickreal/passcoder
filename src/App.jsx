import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumerAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const maxPasscodeLength = 100, minPasscodeLength = 6;

  const passwordGenerator = useCallback(() => {
    let code = '', str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charactersAllowed) str += '!@#$%^&*()_+{}[]-=~`\|;:".>/?,<';
    for (let i = 0; i < length; ++i) {
      code += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(code);
  }, [length, numberAllowed, charactersAllowed]);

  const passwordRef = useRef(null);
  const copyPasscodeToClipboard = () => {
    passwordRef.current?.setSelectionRange(minPasscodeLength, maxPasscodeLength);
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(passwordGenerator, [numberAllowed, charactersAllowed, length]);

  return (
    <div id='heading'>
      <label for='password_generator'><big id='password_generator'>Password generator</big></label>
      <input onClick={copyPasscodeToClipboard} id='passcodecontainer' type="text" value={password} placeholder='passcode' readOnly ref={passwordRef} />
      <div id='checkboxes'>
        <span><label for='number_allowed'>include digits</label><input id='number_allowed' type="checkbox" onChange={() => setNumerAllowed(pre => !pre)} /></span>
        <span><label for='character_allowed'>include special characters</label><input id='character_allowed' type="checkbox" onChange={() => setCharactersAllowed(pre => !pre)} /></span>
      </div>
      <input type="range" min={minPasscodeLength} max={maxPasscodeLength} value={length} onChange={e => setLength(e.target.value)}></input>
    </div>
  )
}