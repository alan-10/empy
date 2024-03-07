import React from 'react'
import { createContext, useContext, useState } from 'react';


interface iClientToVinculateInPortfoio {
  assistantId?: string;
  clientIds?: string[]
}


interface IContext {
  clientToVinculateInPortfoio: iClientToVinculateInPortfoio
  setclientToVinculateInPortfoio(data: iClientToVinculateInPortfoio): void
  loadPage: boolean;
  addLoadPage(): void;
  assistantSelected: string
  setAssistantSelected(assistantId: string): void
}


export const ContextCreate = createContext<IContext | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const [clientToVinculateInPortfoio, setclientToVinculateInPortfoio] = useState<iClientToVinculateInPortfoio>({ assistantId: '', clientIds: [] })
  const [loadPaging, setLoadPaging] = useState(false);
  const [assistantSelected, setAssistantSelected] = useState('')

  function addLoadPage() {
    setLoadPaging(!loadPaging)
  }


  return (
    <ContextCreate.Provider value={{
      clientToVinculateInPortfoio: clientToVinculateInPortfoio,
      setclientToVinculateInPortfoio: setclientToVinculateInPortfoio,
      loadPage: loadPaging,
      addLoadPage,
      assistantSelected,
      setAssistantSelected
    }}>
      {children}
    </ContextCreate.Provider>
  )

}

// export function con (){
//  const context =  useContext(ContextCreaate)

//  return context
// }





