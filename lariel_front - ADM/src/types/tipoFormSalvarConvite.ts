import type { UseFormRegister } from "react-hook-form";
import type { TipoSalvarConvite } from "./tipoSalvarConvite";

export type TipoPropsFormSalvarConvite = { 
    register: UseFormRegister<TipoSalvarConvite>;
    onSubmit: () => void;  
}
 