import { porta, serverHttp } from "./app";

serverHttp.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));