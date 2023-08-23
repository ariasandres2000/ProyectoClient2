import { User } from "../models/user";
import { Respuesta } from "./respuesta";

export class UserRequest extends Respuesta {
    data?: Array<User>;
}