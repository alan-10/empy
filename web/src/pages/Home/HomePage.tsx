import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import AssistantComponent from './components/AssistantComponent';
import styled from 'styled-components';
import TableComponent from '../../components/TableComponent';
import CadastroDialog from '../../components/CadastroDialog';
import { api } from '../../axios/api'
import { useContext } from 'react'
import { ContextCreate } from '../../useContext';
import { LeftSideBar } from './components/LeftSideBar'

const FlexContainer = styled.div`
  display: flex;
  gap: 50px;
  /* background-color: red; */
  height: 100%;
`;


interface IAssistants {
  email: string
  id: string
  name: string
  phone: string
}


interface IClients {
  id: string
  name: string
  code: string
  merchant: string
  portfolioId: string
}


//alan page home
const Home: React.FC = () => {

  const contextApi = useContext(ContextCreate)


  const [asisstants, setAssistants] = useState<IAssistants[]>([]);
  const [clientesWithoutPortfolio, setclientesWithoutPortfolio] = useState<IClients[]>([])
  const [clientByPortfolioAssistant, setclientByPortfolioAssistant] = useState<IClients[]>([])
  const [nameAssistant, setNameAssistant] = useState('')


  useEffect(() => {

    getAllAssitant()
      .then(data => {

        if (contextApi?.assistantSelected) {
          const assistantInfo = data.filter(assistante => assistante.id === contextApi?.assistantSelected)

          if (assistantInfo.length > 0) {
            setNameAssistant(assistantInfo[0].name)
          }

        }

        if (!contextApi?.assistantSelected) {
          contextApi?.setAssistantSelected(data[0].id)
        }

        setAssistants(data)

      })
      .catch((error) => {
        console.log('assistante erro', error.message);
      })

    getUserWithoutPortifolio()
      .then(data => {
        setclientesWithoutPortfolio(data)

      })
    getClientByPortfolioAssistant()


  }, [contextApi?.loadPage, contextApi?.assistantSelected]);


  async function getAllAssitant(): Promise<IAssistants[]> {
    const assitants = await api.get('/assistant');
    return assitants.data;
  }

  async function getUserWithoutPortifolio() {
    const clients = await api.get('/client/withoutPortifolio');
    return clients.data;
  }



  async function getClientByPortfolioAssistant() {
    if (contextApi?.assistantSelected) {
      const clients = await api.get(`/client/listClientsByPortfolioAssistant/${contextApi?.assistantSelected}`)
      setclientByPortfolioAssistant(clients.data)
    }
  }


  const [cadastroDialogAberto, setCadastroDialogAberto] = useState(false);

  const abrirCadastroDialog = () => {
    console.log('botao true 2');
    setCadastroDialogAberto(true);
  };

  const fecharCadastroDialog = () => {
    console.log('botao false');
    setCadastroDialogAberto(false);
  };


  async function vinculateClientsInPortfolioAssitant(assistantId?: string) {


    const hasClientsSelected = contextApi?.clientToVinculateInPortfoio.clientIds?.length ?? null

    if (!hasClientsSelected) {
      return
    }

    const totalClientUpdated = await api.put('/client/vinculatePortfolio',
      {
        assistantId: assistantId,
        clientIds: contextApi?.clientToVinculateInPortfoio.clientIds
      })

    contextApi?.addLoadPage()

    return totalClientUpdated;
  }

  async function unlinkClintPortfolio(assistantId?: string) {

    console.log('unlik', contextApi?.clientToVinculateInPortfoio.clientIds);

    const hasClientsSelected = contextApi?.clientToVinculateInPortfoio.clientIds?.length ?? null

    if (!hasClientsSelected) {
      return
    }

    const totalClientUpdated = await api.put('/client/removePortfolio', {
      assistantId: assistantId,
      clientIds: contextApi?.clientToVinculateInPortfoio.clientIds
    })


    contextApi?.addLoadPage()

    return totalClientUpdated

  }


  return (


    <div className="flex h-screen">
      <LeftSideBar />
      {/* <Sidebar /> */}

      <div className="flex-1 overflow-hidden p-4 pl-32" style={{ maxHeight: '100vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '28px', color: '#121929', fontFamily: 'Arial' }}>
          Carteira de Clientes
        </h1>
        <AssistantComponent assitants={asisstants} />
        <FlexContainer>
          <div >
            <TableComponent
              tableHeaderText={{ name: 'Clientes (Não vinculados)' }}
              button1={{
                text: "Adicionar cliente",
                onClick: abrirCadastroDialog,
              }}
              button2={{
                text: "Vincular ",
                color: 'blue',
                onClick: () => vinculateClientsInPortfolioAssitant(contextApi?.assistantSelected)
              }}
              clients={clientesWithoutPortfolio}
            />
          </div>

          <CadastroDialog
            titleDialog='Cadastro de Cliente'
            param1={{ value: 'Código do Cliente', placeholder: 'Digite o Código' }}
            param2={{ value: 'Nome Completo', placeholder: 'Digite o Nome Completo' }}
            param3={{ value: 'Rede', placeholder: 'Digite a Rede' }}
            isOpen={cadastroDialogAberto} onClose={fecharCadastroDialog}
            saveOption={{ client: true }}
          />

          <div>
            <TableComponent
              tableHeaderText={{ name: `Cateira do ${nameAssistant}` }}

              button2={{
                text: "Desvincular",
                color: '#EB2F0A',
                onClick: () => unlinkClintPortfolio(contextApi?.assistantSelected)
              }}
              clients={clientByPortfolioAssistant}
            />
          </div>
        </FlexContainer>
      </div>
    </div>

  );

};

export default Home;
