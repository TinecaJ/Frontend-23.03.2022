import { controls } from "./control.model";
import { riskas } from "./riska.model";

export interface riskcs {

    _id: string,
    Justification:string,
    RiskCupload:string,
    RiskCSignature: string,
    
    RiskControl:controls[]

}