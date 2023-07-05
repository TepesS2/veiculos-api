class Veiculo {
    constructor (_id,placa, ano, modelo, fabricante){
        this._id=_id;
        this.placa = placa;
        this.ano = ano;
        this.modelo = modelo;
        this.fabricante = fabricante;
    }

    static async listarVeiculos(){
        const db = require("./db");
    return await db.findAll("veiculos"); //nome da collection no mongo db
    }
}
//mesmo nome do arquivo .js
module.exports = Veiculo;