import { motion } from "motion/react"
import { useState } from 'react'

function App() {
  const [giro, setGiro] = useState(0)
  const [modalPremio, setModalPremio] = useState(false)
  const [premio, setPremio] = useState(0)

  function girarRoleta() {
    const aleatorio = probabilidadeRoleta()
    const novo_giro = giro + 360 + (45 / 2) + aleatorio[0]
    setGiro(novo_giro)
    setPremio(aleatorio[1])

    setTimeout(() => {
      setModalPremio(true)
    }, 3500)
  }

  function probabilidadeRoleta() {
    const aleatorio = Math.floor(Math.random() * 100)

    if (aleatorio < 12) { return [45 * 1, 8] }
    if (aleatorio < 25) { return [45 * 2, 7] }
    if (aleatorio < 37) { return [45 * 3, 6] }
    if (aleatorio < 50) { return [45 * 4, 5] }
    if (aleatorio < 62) { return [45 * 5, 4] }
    if (aleatorio < 75) { return [45 * 6, 3] }
    if (aleatorio < 87) { return [45 * 7, 2] }
    if (aleatorio < 100) { return [45 * 8, 1] }
    else { return [0, 0] }
  }

  return (
    <div className='h-screen w-screen mx-auto p-2 items-center flex flex-col justify-center bg-[url("/bg.jpg")] bg-cover bg-no-repeat bg-center'>

      {!modalPremio && (
        <div className='flex flex-col items-center justify-center'>
          <motion.img
            className='size-25'
            initial={{ rotate: 90 }}
            src="/seta.png" />

          <motion.img
            className='aspect-square max-w-100'
            initial={{ rotate: 0 }}
            animate={{
              rotate: giro,
              transition: { duration: 2 }
            }}
            src="/roleta.png" />

          <button className='bg-yellow-300 p-2 rounded-lg m-2 w-50 text-2xl shadow-md shadow-zinc-800'
            onClick={() => {
              console.log("Clicou")
              girarRoleta()
            }}>
            Ativar Roleta
          </button>

        </div>
      )}

      {modalPremio && (
        <div className='bg-black/60 fixed inset-0 flex items-center justify-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='max-w-[640px] max-h-[40%] rounded-xl p-6 shadow-xl bg-blue-950 space-y-5 text-center flex justify-between items-center flex-col'>
            <h1 className='text-amber-400 text-2xl sm:text-3xl md:text-4xl'> Seu prêmio foi o {premio}</h1>
            <button 
            onClick={()=>{
              setGiro(0)
              setModalPremio(false)
              setPremio(0)
            }}
            className='bg-yellow-300 p-2 py-4 rounded-lg m-2 w-[80%] text-lg text-zinc-900 shadow-md shadow-zinc-800'>
              Quer tentar novamente?
            </button>
          </motion.div>
        </div>
      )}

    </div>
  )
}

export default App
