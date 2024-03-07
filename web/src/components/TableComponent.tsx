import React, { useEffect, useState, useContext, createContext } from 'react';
import { Badge, Table, TextField } from '@radix-ui/themes';
import { Button } from './ui/button';
import { MagnifyingGlassIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ArrowRight, Link } from 'lucide-react';
import CadastroDialog from './CadastroDialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form';
import { Checkbox } from './ui/checkbox';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { ContextCreate } from '../useContext'
// import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';

const Container = styled.div`
  display: flex;
  gap: 20px;

`;

interface Client {
  id: string
  name: string
  code: string
  merchant: string
  portfolioId: string
}

interface ClientChecked {
  id: string
  name: string
  code: string
  merchant: string
  portfolioId: string
  isChecked?: Boolean
}

interface TableComponentProps {
  tableHeaderText: {
    name: string
  };
  button1?: {
    text: string;
    onClick: () => void;
  };
  button2: {
    text: string;
    onClick: () => void;
    color:  string;
  };

  clients?: Client[];
  // onSubmit: (selectedClients: Client[]) => void;
}






const TableComponent: React.FC<TableComponentProps> = ({ tableHeaderText, button1, button2, clients }: TableComponentProps) => {

  const contextApi = useContext(ContextCreate)



  const divStyle: React.CSSProperties = {
    backgroundColor: 'white',
    // height: '100%',
    width: '638px',
    padding: '20px',
    borderRadius: '18px',
    marginTop: '24px',
    maxHeight: '70vh',
    minHeight: '70vh'
    // overflow: 'auto'

  };

  const h2Style: React.CSSProperties = {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#121929',
  };



  const CheckboxWrapper = styled.div<{ isChecked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 18px;
    background-color: #ebedef;
    margin-bottom: 10px;
    padding-right: 8px;
    width: 590px;
    height: 45px;
    padding-left: 20px;
    font-weight: 500;
    overflow: auto;
   

    span {
      margin-right: 18px;
      margin-left: 10px;
    }

    input {
      margin-right: 8px;
    }

    input:checked::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid #00bdff;
      border-radius: 18px;
      pointer-events: none;
    }

  span:last-child {
    margin-left: auto;
  }
`;

  const HeaderWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 28px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: rgba(18, 25, 41, 0.6);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;

  span {
    margin-right: 20px;
    margin-left: 10px;
  }

  input {
    margin-right: 8px;
  }

  span:last-child {
    margin-left: auto;
  }
`;

  const [headerCheckboxState, setHeaderCheckboxState] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<ClientChecked[] | undefined>(clients);


  useEffect(() => {
    setCheckboxStates(clients)
    setHeaderCheckboxState(false)
    clientsToVinculatePotfolio(checkboxStates)

  }, [clients])


  const handleHeaderCheckboxChange = () => {

    if (!headerCheckboxState) {
      const allClientsWithCheckedTrue = checkboxStates?.map(client => {
        client.isChecked = true

        return client
      });

      setCheckboxStates(allClientsWithCheckedTrue)

    }

    if (headerCheckboxState) {
      const allClientsWithCheckedFase = checkboxStates?.map(client => {
        client.isChecked = false

        return client
      });

      setCheckboxStates(allClientsWithCheckedFase)
    }

    setHeaderCheckboxState(prevState => !prevState);

    clientsToVinculatePotfolio(checkboxStates)

  };

  const handleCheckboxChange = (clientId: string) => {

    setCheckboxStates(prevStates => {
      const newState = [...(prevStates ?? [])];

      const indexClient = newState.findIndex((client) => client.id === clientId)

      newState[indexClient].isChecked = !newState[indexClient].isChecked

      return newState
    });

    clientsToVinculatePotfolio(checkboxStates)

  };


  function clientsToVinculatePotfolio(cliensts?: ClientChecked[]) {

    const clientsCheckedIds = cliensts?.reduce((acc: string[], client) => {
      if (client.isChecked === true) {
        acc.push(client.id)
      }
      return acc
    }, [])

    contextApi?.setclientToVinculateInPortfoio({ clientIds: clientsCheckedIds, assistantId: contextApi.assistantSelected })

  }


  function serchClient(input: string) {

    const currentClient = [...(clients ) || []]

      const result = currentClient?.filter(client => {
        if(client.name.includes(input) || client.code.includes(input)){
          return client
        }
      })

        setCheckboxStates(result)
  }

  return (
    <Container>
      <div style={divStyle}  >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' , maxHeight: '100%'}}>
          <h2 style={h2Style}>{tableHeaderText.name}</h2>
          <Badge radius="full" style={{
            border: '1px solid rgba(18, 25, 41, 0.12)',
            color: '#00BDFF',
            background: 'transparent'
          }}>
            {clients?.length}
          </Badge>


          <div className="flex ml-auto">
            {button1?.onClick && (
              <Button
                className="bg-customBlue-500 shadow-sm mt-2 ml-0 rounded-full w-[144px] h-[26px] transition duration-300 ease-in-out transform hover:shadow-xl "
                variant="outline"
                size="icon"
                onClick={button1?.onClick}>
                <PlusCircledIcon className="w-[18px] h-[18px] text-white" />
                <span style={{ fontFamily: 'Arial', fontWeight: 'normal', fontSize: '12px', color: 'white', marginLeft: '4px' }}>{button1?.text}</span>
              </Button>
            )}


            <Button
              onClick={button2.onClick}
              className=" shadow-sm ml-2 mt-2 rounded-full w-[98px] h-[26px] transition duration-300 ease-in-out transform hover:shadow-xl"
              // variant="outline"
              size="icon"
              style={{backgroundColor:button2.color}}
            >
              <span style={{ fontFamily: 'Arial', fontWeight: 'normal', fontSize: '12px', color: 'white', marginRight: '6px' }}>{button2.text}</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="1" fill="none" />
                <path d="M8 6L10 8L8 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 8H5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>

        <div className='mt-4' >
          <TextField.Root className="" style={{ width: '590px', margin: 'auto' }} >
            <TextField.Slot>
              <MagnifyingGlassIcon height="18" width="18" style={{ color: '#121929' }} />
            </TextField.Slot>
            <TextField.Input onChange={(e) => serchClient(e.target.value)} radius='full' placeholder="Buscar "   style={{ fontFamily: 'Arial', fontSize: '14px', paddingBottom: '0' }} />
          </TextField.Root>
        </div>


        <div className="mt-0">

          <Table.Root >
            <Table.Header>
              <HeaderWrapper>
                <input
                  type="checkbox"
                  checked={headerCheckboxState}
                  onChange={handleHeaderCheckboxChange}
                />
                <span>Código</span>
                <span>Parceiro</span>
                <span>Rede</span>
              </HeaderWrapper>
            </Table.Header>

            {/* <Table.Body> */}

            <div style={{maxHeight: '50vh'}}>
              {checkboxStates?.map((client, index) => (
                <CheckboxWrapper
                  key={index}
                  isChecked={!!client?.isChecked}
                // className={`table-row-item ${checkboxStates[index] ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={!!client?.isChecked}
                    onChange={() => handleCheckboxChange(client.id)}
                  />
                  <span>{client.code}</span>
                  <span>{client.name}</span>
                  <span>{client.merchant}</span>
                </CheckboxWrapper>
              ))}
            </div>
            {/* </Table.Body> */}
          </Table.Root>

        </div>
        {/* <CadastroDialog isOpen={false} onClose={() => {}} /> */}
      </div>
    </Container>
  );
};

export default TableComponent;
