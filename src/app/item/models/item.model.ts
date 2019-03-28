export interface Item {
    nomeItem: string;
    unidadeMedida: string;
    quantidade: number;
    preco: number;
    perecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Date;
}