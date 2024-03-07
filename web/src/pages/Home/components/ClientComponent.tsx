import React, { useState } from 'react';
import TableComponent from '../../../components/TableComponent';
import CadastroDialog from '../../../components/CadastroDialog';

interface ClientComponentProps {
}

const ClientComponent: React.FC<ClientComponentProps> = () => {
  const [cadastroDialogAberto, setCadastroDialogAberto] = useState(false);

  const abrirCadastroDialog = () => {
    console.log('botao true 2');
    setCadastroDialogAberto(true);
  };

  const fecharCadastroDialog = () => {
    console.log('botao false');
    setCadastroDialogAberto(false);
  };

  return (
      <>
        {/* <div key="component1">
          <TableComponent
            tableHeaderText="Clientes (Não vinculados)"
            button1={{
              text: "Adicionar cliente",
              onClick: abrirCadastroDialog,
            }}
            button2={{ text: "Vincular", onClick: () => console.log("Botão 2 clicado") }}
          />
        </div>

        <CadastroDialog titleDialog='Cadastro de Cliente' param1='Código do Cliente' param2='Nome Completo' param3='Rede' isOpen={cadastroDialogAberto} onClose={fecharCadastroDialog} />
        */}
       {/* <Button className="bg-customBlue-500 shadow-sm ml-4 mt-2 rounded-full w-[54px] h-[43px] transition duration-300 ease-in-out transform hover:shadow-xl"
      variant="outline" size="icon" onClick={abrirCadastroDialog}>
        <PlusCircledIcon className="w-[20px] h-[20px] text-white" />
    </Button>

    <CadastroDialog isOpen={cadastroDialogAberto} onClose={fecharCadastroDialog} />
       */}
    </>
  );
};

export default ClientComponent;
