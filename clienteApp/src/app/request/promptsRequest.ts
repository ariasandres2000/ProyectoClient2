import { Prompts } from "../models/prompts";
import { Respuesta } from "./respuesta";

export class PromptsRequest extends Respuesta {
    data?: Array<Prompts>;
}