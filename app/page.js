'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { CSSTransition } from "react-transition-group"
import { TeamCard } from '../components/teamCard'

let array_elementos = [
  'Fibra 50Mb',
  'Fibra 100Mb',
  'Fibra 200Mb',
  'Fibra 300Mb',
  'Fibra 600Mb',
  'Fibra 1Gb'
]

function MainContainer () {
  const nodeRef = useRef(null)
  const [elementos, setElementos] = useState(array_elementos)
  const [grupo1, setGrupo1] = useState([])
  const [grupo2, setGrupo2] = useState([])
  const [state, setState] = useState(false)


  const __edit = (id) => {
    console.log(`Editar ${id}`)
  }

  const __remove = (id) => {
    console.log(`Borrar ${id}`)
    const new_elementos = [...elementos]
    new_elementos.splice(id, 1)
    setElementos(new_elementos)
  }

  const __generate = () => {
    console.log("Generar")
    setState(true)
  }

  useEffect(() => {
    console.log('Actualizado Elementos')
  }, [elementos])



  return (

    <div className="relative flex flex-row place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]" >

      <div className='flex flex-col place-items-center'>

        <CSSTransition in appear={true} timeout={2000} classNames="fade" nodeRef={nodeRef}>
          <div ref={nodeRef}>
            <div className='w-full flex flex-row place-content-center m-10'>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => __generate()}
              >
                Generar
              </button>
            </div>

            <div className='flex flex-row place-items-center flex-wrap'>
              <ul role="list" className="divide-y divide-gray-200 bg-gray-300 py-4 px-7 rounded-sm z-[10] m-4">
                {elementos.map((elemento, index) => (
                  <li key={elemento} className="flex justify-between gap-x-6 py-2">
                    <div className="min-w-0 flex flex-wrap content-center">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{elemento}</p>
                    </div>
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={() => __edit(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                          <path d="M16 5l3 3"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="ml-2 rounded-md bg-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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
                    </div>
                  </li>
                ))
                }
              </ul >

              <CSSTransition
                in={state}
                timeout={2000}
                classNames="fade"
                unmountOnExit
              >
                <div>
                  <TeamCard title='AAA' icon={true} />
                  <TeamCard title='BBB' />
                </div>
              </CSSTransition>
            </div>
          </div>
        </CSSTransition>
      </div>

    </div >
  )
}

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      { /* Cabecera */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>


      <MainContainer />

      { /* Pie */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main >
  )
}
