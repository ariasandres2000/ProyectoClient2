import { Respuesta } from "./respuesta";

export class OpenAi extends Respuesta {
    result: String;
    id: Number;
    exception: String;
    status: Number;
    isCanceled: Boolean;
    isCompleted: Boolean;
    isCompletedSuccessfully: Boolean;
    creationOptions: Number;
    asyncState: String;
    isFaulted: Boolean;
}
