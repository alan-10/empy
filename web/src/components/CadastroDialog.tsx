import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';
import { api } from '../axios/api'

import { ContextCreate} from '../useContext'


interface SaveOptions {
  client?: boolean
  assistant?: boolean
}

interface ICreateAssistant {
  email: string
  name: string
  phone: string
}

interface ICreateClient {
  name: string
  code: string
  merchant: string
}


interface CadastroDialogProps {
  isOpen: boolean;
  onClose: () => void;
  titleDialog: string;
  param1: string;
  param2: string;
  param3: string;
  saveOption: SaveOptions
}

const CadastroDialog: React.FC<CadastroDialogProps> = ({ isOpen, onClose, titleDialog, param1, param2, param3, saveOption }) => {

  const contextApi = useContext(ContextCreate)

  const [inputParam1, setInputParam1] = useState('')
  const [inputParam2, setInputParam2] = useState('')
  const [inputParam3, setInputParam3] = useState('')


  const handleParam1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputParam1(event.target.value)
  }
  const handleParam2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputParam2(event.target.value)

  }
  const handleParam3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputParam3(event.target.value)
  }



  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saveOption.assistant === saveOption.client) {
      return
    }

    if (saveOption.assistant) {
      await createAssistant({ name: inputParam1, email: inputParam2, phone: inputParam3 })
    }

    if (saveOption.client) {
      await createclient({ code: inputParam1, name: inputParam2, merchant: inputParam3 })
    }
  }


  async function createAssistant(data: ICreateAssistant) {
    await api.post('/assistant', data)
    onClose()
    contextApi?.addLoadPage()
  }


  async function createclient(data: ICreateClient) {
    await api.post('/client', data)
    onClose()
    contextApi?.addLoadPage()
  }

  return (

    <Dialog open={isOpen}>

      <DialogContent className="sm:max-w-[800px] h-[479px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-sans">{titleDialog}</DialogTitle>

        </DialogHeader>
        <form className="grid gap-4 border border-bg-customDark-12 rounded-3xl p-2 " onSubmit={submit}>
          <div className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-4 text-left">
              <Label htmlFor="codeClient">{param1}</Label>
            </div>
            <div className="col-span-4">
              <Input id="codeClient" placeholder="Digite seu nome" className="rounded-xl p-4" onChange={handleParam1} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-4 text-left">
              <Label htmlFor="nameClient">{param2}</Label>
            </div>
            <div className="col-span-4">
              <Input id="nameClient" placeholder="Digite seu e-mail" className="rounded-xl p-4" onChange={handleParam2} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <div className="col-span-4 text-left">
              <Label htmlFor="network">{param3}</Label>
            </div>
            <div className="col-span-4">
              <Input id="network" placeholder="Digite seu telefone" className="rounded-xl p-4" onChange={handleParam3} />
            </div>
          </div>
          <div className="">
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={onClose} type="button" variant="secondary" className="bg-customDark-12 w-[255px] h-[43px] transition duration-300 ease-in-out transform hover:shadow-xl rounded-3xl">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-customBlue-500 text-white w-[255px] h-[43px] transition duration-300 ease-in-out transform hover:shadow-xl rounded-3xl">
                Salvar
              </Button>
            </DialogFooter>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default CadastroDialog;
