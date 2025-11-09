/* eslint-disable react/react-in-jsx-scope */
'use client'

import { useState, useEffect } from 'react'
import { TeamCard } from '../components/teamCard'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

const id = uuidv4();
console.log(id);
console.log('Version', '1.0.4')
console.log(process.env.NODE_ENV)
const basePath = process.env.NODE_ENV === 'production' ? '/teamgenerator' : ''


let array_elementos = [
  ['Juane', false, 80],
  ['Joserra', true, 50],
  ['Enrique', false, 70],
  ['Madrid', false, 30],
  ['Ramon', false, 60],
  ['Lucas', false, 70],
  ['David', false, 45],
  ['Jero', false, 75],
  ['Juanjo', false, 0],
  ['Javi', false, 30],
  ['Santi', false, 70],
  ['Pablo', true, 50],
  ['Angel', false, 70],
  ['⁠Maxi', false, 20],
  ['Dani', false, 90],
  ['Mario', false, 50],
  ['Eric', false, 75],
  ['⁠Carlos', false, 70]
]

function MainContainer () {
  const [elementos, setElementos] = useState(array_elementos)
  const [grupo1, setGrupo1] = useState([])
  const [grupo2, setGrupo2] = useState([])
  const [list, setList] = useState([])
  const [media1, setMedia1] = useState([])
  const [media2, setMedia2] = useState([])
  const [cuotas, setCuotas] = useState({
    A: { A: '', Empate: '', B: '' },
    B: { A: '', Empate: '', B: '' }
  })

  const __remove = (id) => {
    const new_elementos = [...elementos]
    new_elementos.splice(id, 1)
    setElementos(new_elementos)
  }

  const __generate = () => {

    const mitad = elementos.length / 2
    let mitad1 = mitad
    let mitad2 = mitad
    const array_elementos = [...elementos]
    let grupo1 = []
    let grupo2 = []
    let controlGrupo = 0
    let mediaTeam1 = 0
    let mediaTeam2 = 0

    const indiceP = array_elementos
      .map((elemento, index) => array_elementos[index][1] ? index : undefined)
      .filter(index => index !== undefined)

    if (indiceP.length > 1) {

      if (indiceP[0] !== undefined) {
        mitad1--
        switch (Math.floor(Math.random() * 2)) {
          case 0:
            controlGrupo = 0
            grupo1.push(array_elementos[indiceP[0]])
            break;

          case 1:
            controlGrupo = 1
            grupo2.push(array_elementos[indiceP[0]])
            break;
        }
      }

      if (indiceP[1] !== undefined) {
        mitad2--
        controlGrupo === 1 ? grupo1.push(array_elementos[indiceP[1]]) : grupo2.push(array_elementos[indiceP[1]])
      }

      array_elementos.splice(indiceP[0], 1)
      array_elementos.splice(indiceP[1] - 1, 1)

    }

    for (let i = 0; i < mitad1; i++) {
      const indice = Math.floor(Math.random() * array_elementos.length)
      const nombre = array_elementos[indice]

      grupo1.push(nombre)
      array_elementos.splice(indice, 1)
    }

    for (let i = 0; i < mitad2; i++) {
      const indice = Math.floor(Math.random() * array_elementos.length)
      const nombre = array_elementos[indice]

      grupo2.push(nombre)
      array_elementos.splice(indice, 1)
    }

    grupo1 = grupo1.filter(function (element) {
      return element !== undefined;
    });

    grupo2 = grupo2.filter(function (element) {
      return element !== undefined;
    });

    mediaTeam1 = __media(grupo1.map(elemento => elemento[2]))
    mediaTeam2 = __media(grupo2.map(elemento => elemento[2]))

    console.log(mediaTeam1)
    console.log(mediaTeam2)

    const diferencia = Math.abs(mediaTeam1 - mediaTeam2).toFixed(2)
    console.log(diferencia)

    setGrupo1(grupo1)
    setGrupo2(grupo2)
    setMedia1(mediaTeam1)
    setMedia2(mediaTeam2)

    setCuotas(__calcularCuota(mediaTeam1, mediaTeam2))

    if (diferencia > 1) {
      __generate()
      return
    }

  }

  const __generateList = () => {
    const lineas = list.split('\n')

    const nombres = []
    const defaultMedia = 50

    lineas.forEach((linea) => {
      const nombre = linea.replace(/\s/g, '').replace(/^\d+\.\s*/, '').replace(/,/g, '').replace(/[0-9]/g, '').trim()
      if (!nombre) return
      const keeper = nombre.toUpperCase() == 'JOSERRA' || nombre.toUpperCase() == 'PABLO' ? true : false

      const existente = array_elementos.find(el => el && el[0] && el[0].toString().toUpperCase() === nombre.toUpperCase())
      const media = existente ? (typeof existente[2] !== 'undefined' ? existente[2] : defaultMedia) : defaultMedia

      nombres.push([nombre, keeper, media])
    })

    setElementos(nombres)
  }

  useEffect(() => {

  }, [elementos])


  const __selectKeeper = (index) => {
    const new_elementos = [...elementos]
    new_elementos[index][1] = !elementos[index][1]
    setElementos(new_elementos)
  }

  const __media = (array) => {
    const suma = array.reduce((a, b) => a + b, 0)
    return (suma / array.length).toFixed(2)
  }

  const __updateMedia = (index, media) => {
    const new_elementos = [...elementos]
    new_elementos[index][2] = parseInt(media)
    setElementos(new_elementos)
  }

  const __calcularCuota = (QA, QB, sensibilidad = 20, margen = 0.05) => {
    const pA_base = 1 / (1 + Math.pow(10, (QB - QA) / sensibilidad))
    const pB_base = 1 - pA_base

    const diferencia = Math.abs(QA - QB)
    const pEmpate_base = Math.max(0.05, 0.3 - (diferencia / 200))

    const total = pA_base + pB_base + pEmpate_base
    const pA = pA_base / total
    const pB = pB_base / total
    const pEmpate = pEmpate_base / total

    const cuotaA_sin = 1 / pA
    const cuotaEmpate_sin = 1 / pEmpate
    const cuotaB_sin = 1 / pB

    const pA_m = pA * (1 - margen)
    const pB_m = pB * (1 - margen)
    const pEmpate_m = pEmpate * (1 - margen)

    const cuotaA_con = 1 / pA_m
    const cuotaEmpate_con = 1 / pEmpate_m
    const cuotaB_con = 1 / pB_m

    return {
      A: {
        A: cuotaA_sin.toFixed(2),
        Empate: cuotaEmpate_sin.toFixed(2),
        B: cuotaB_sin.toFixed(2)
      },
      B: {
        A: cuotaA_con.toFixed(2),
        Empate: cuotaEmpate_con.toFixed(2),
        B: cuotaB_con.toFixed(2)
      }
    }
  }




  return (

    <div className="relative flex flex-row place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-60 after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-linear-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]" >

      <div className='flex flex-col place-items-center'>

        <div className='flex flex-row place-items-center flex-wrap items-start justify-center'>

          <div>
            <div className='flex flex-col'>
              <div className='px-7 rounded-sm z-10 m-4'>
                <div
                  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
                >
                  <textarea
                    id="OrderNotes"
                    className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-gray-700 p-4 bg-white"
                    rows="20"
                    placeholder="Pegar lista de jugadores..."
                    onChange={e => setList(e.target.value)}
                  ></textarea>

                  <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <button
                      type="button"
                      className="text-gray-700 hover:text-gray-600 bg-linear-to-r focus:ring-4 bg-gray-200 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-r focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => __generateList()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div>

            <div className='flex flex-col'>

              <ul role="list" className="divide-y divide-gray-200 bg-gray-300 py-4 px-7 rounded-sm z-10 m-4">
                {elementos.map((elemento, index) => (
                  <li key={elemento[0]} className="flex justify-between gap-x-6 py-2">
                    <div className="min-w-0 flex flex-wrap content-center">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{elemento[0]}</p>
                    </div>
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="ml-2 rounded-md bg-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={() => __remove(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </button>

                      <div className='flex flex-col place-items-center ml-6'>

                        <div className='mb-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-hand-stop text-gray-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" /><path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /></svg>
                        </div>

                        <label
                          htmlFor={"check" + index}
                          className="relative h-6 w-14 cursor-pointer rounded-full bg-gray-500 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500"
                        >
                          <input
                            type="checkbox"
                            id={"check" + index}
                            checked={elemento[1]}
                            onChange={() => { __selectKeeper(index) }}
                            className="peer sr-only [&:checked+span_svg[data-checked-icon]]:block [&:checked+span_svg[data-unchecked-icon]]:hidden"
                          />

                          <span
                            className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
                          >
                            <svg
                              data-unchecked-icon
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <svg
                              data-checked-icon
                              xmlns="http://www.w3.org/2000/svg"
                              className="hidden h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </label>
                      </div>

                      <div className="min-w-0 flex flex-wrap content-center">
                        <div className="input-group p-2 ml-6">
                          <input
                            type="number"
                            id={"input" + index}
                            className="form-control text-gray-900 font-semibold"
                            style={{ width: 45, borderRadius: 5, padding: 5 }}
                            placeholder="89"
                            value={elemento[2]}
                            onChange={e => { __updateMedia(index, e.target.value) }}
                          />
                        </div>
                      </div>

                    </div>
                  </li>
                ))
                }
              </ul >

              <div className='flex flex-row-reverse mr-2'>
                <button
                  type="button"
                  className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => {
                    const text = prompt('Nombre Jugador')
                    if (text) {
                      let array_elementos = [...elementos]
                      array_elementos.push([text, false, 85])
                      setElementos(array_elementos)
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-rounded-plus" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                    <path d="M15 12h-6"></path>
                    <path d="M12 9v6"></path>
                  </svg>
                </button>
              </div>

            </div>

          </div>

          <div>
            <div className='flex flex-row place-content-center m-5'>
              <button
                type="button"
                className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => __generate()}
              >
                Generar
              </button>
            </div>

            <div className='flex flex-row'>
              <TeamCard title='Equipo Blanco' icon="white" elements={grupo1} media={media1} />
              <TeamCard title='Equipo LGBTI+' icon="color" elements={grupo2} media={media2} />
            </div>

            <div className='flex flex-row'>
              <div className='divide-y divide-gray-200 bg-gray-300 py-4 px-7 rounded-sm z-10 m-4 w-full'>
                <p className="text-md font-semibold leading-6 text-gray-900 pb-1">
                  Cuotas
                </p>
                <table className="table-coutas table-auto border-collapse w-full text-gray-800">
                  <thead>
                    <tr className='text-xs font-medium'>
                      <th></th>
                      <th>1</th>
                      <th>X</th>
                      <th>2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Image
                          src={`${basePath}/80-16.png`}
                          alt="shirt"
                          className={"rounded-lg h-auto w-[75px]"}
                          width={35}
                          height={4}
                          priority
                        />
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.A.A}
                        </span>
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.A.Empate}
                        </span>
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.A.B}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Image
                          src={`${basePath}/80-406.png`}
                          alt="shirt"
                          className={"rounded-lg h-auto w-[75px]"}
                          width={35}
                          height={4}
                          priority
                        />
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.B.A}
                        </span>
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.B.Empate}
                        </span>
                      </td>
                      <td>
                        <span className='bg-gray-800 text-gray-300 py-1 px-4 rounded-lg'>
                          {cuotas.B.B}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div >
  )
}

export default function Home () {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-24">
      { /* Cabecera */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-linear-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <span className='font-bold text-xl'>TEAM GENERATOR</span>
        </p>
        <div className="flex flex-row items-center fixed bottom-0 left-0 h-48 w-full justify-center bg-linear-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

          <div className='mr-1'>By </div><div><span className='font-bold' style={{ fontSize: 30, fontFamily: 'system-ui' }}>Hoserpa</span></div>

        </div>
      </div>


      <MainContainer />

      { /* Pie */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main >
  )
}
