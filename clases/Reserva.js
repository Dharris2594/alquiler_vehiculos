class Reserva {
    constructor(id, idAuto, fechaInicial, fechaFinal, alquiler, seguro, ibtms, total){
        this.id = id;
        this.idAuto = idAuto;
        this.fechaInicial = fechaInicial;
        this.fechaFinal = fechaFinal;
        this.alquiler = alquiler;
        this.seguro = seguro;
        this.ibtms = ibtms;
        this.total = total;
    }
}

export default Reserva;
