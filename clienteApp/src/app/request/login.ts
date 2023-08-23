import { User } from "../models/user";
import { Respuesta } from "./respuesta"

export class Login extends Respuesta {
    token: String = "";
    data?: User;
}
