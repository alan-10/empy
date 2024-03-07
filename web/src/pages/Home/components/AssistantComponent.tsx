
import React, { useState, useContext } from 'react';
import { Select} from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { ChevronRightIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import CadastroDialog from '../../../components/CadastroDialog';
import { ContextCreate } from '../../../useContext'


interface IAssistant {
  email: string
  id: string
  name: string
  phone: string
}


interface AllAssistants {
  assitants: IAssistant[]
}


const AssistantComponent: React.FC<AllAssistants> = (props: AllAssistants): JSX.Element => {

  const contexctApi = useContext(ContextCreate)

  const [cadastroDialogAberto, setCadastroDialogAberto] = useState(false);

  const abrirCadastroDialog = () => {
    setCadastroDialogAberto(true);
  };

  const fecharCadastroDialog = () => {
    setCadastroDialogAberto(false);
  };


  function setAssitantSelected(e: any) {
    contexctApi?.setAssistantSelected(e)
  }


  return (
    <>
      <div>
        <p style={{ marginTop: '32px', fontFamily: 'Arial', fontWeight: 'normal', fontSize: '14px', color: '#121929' }}>
          Selecione o Assistente Comercial
        </p>
        <div>
          <div >
            <div className="flex items-center">
              <Select >

                <select style={{border: 'none'}} className="bg-white rounded-xl  w-[388px]  h-[36px]  mt-2 shadow-sm " onChange={(e) => setAssitantSelected(e.target.value)} >
                    {props.assitants.map((assitant, index) => {

                    if(index === 0) return <option  selected   value={assitant.id} key={assitant.id}>{assitant.name} </option >
                    
                    if(index !== 0) return <option    value={assitant.id} key={assitant.id}>{assitant.name} </option >
                      
                    })}
                </select>
              </Select>

              <Button className="bg-customBlue-500 shadow-sm ml-4 mt-2 rounded-full w-[54px] h-[43px] transition duration-300 ease-in-out transform hover:shadow-xl"
                variant="outline" size="icon" onClick={abrirCadastroDialog}>
                <PlusCircledIcon className="w-[20px] h-[20px] text-white" />
              </Button>

              <CadastroDialog titleDialog='Cadastro de Assistente Comercial'
                param1={{value: 'Nome Completo', placeholder: 'Digite o nome'}} param2={{value:'Email', placeholder: 'Digite o Email'}}
                param3={{value: 'Telefone', placeholder: 'Digite o Telefone'}}
                isOpen={cadastroDialogAberto} onClose={fecharCadastroDialog}
                saveOption={{ assistant: true }}
              />

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AssistantComponent;
