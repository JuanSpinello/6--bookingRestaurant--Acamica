let Reserva = function(horario, cantidadPersonas, precioPersonas, codigoDescuento) {
    this.horario = horario,
    this.cantidadPersonas = cantidadPersonas,
    this.precioPersonas = precioPersonas,
    this.codigoDescuento = codigoDescuento
}

Reserva.prototype.precioBase = function() {
    return this.cantidadPersonas * this.precioPersonas;
}

Reserva.prototype.precioTotal = function() {
    const precioBase = this.precioBase();
    const adicionales = this.adicionales(precioBase);
    const descuentos = this.descuentos(precioBase);
    return precioBase + adicionales - descuentos;
}

Reserva.prototype.adicionales = function(precioBase) {
    return this.adicionalHorario(precioBase) + this.adicionalFinDeSemana(precioBase);
}

Reserva.prototype.adicionalFinDeSemana = function(precioBase) {
    let diaDeSemana = this.horario.getDay();

    if(diaDeSemana === 0 || diaDeSemana === 5 || diaDeSemana === 6) {
        return precioBase * .10;
    };
    return 0;
}

Reserva.prototype.adicionalHorario = function(precioBase) {
    let horarioDia = this.horario.getHours() === 13 || (this.horario.getHours() === 14 && this.horario.getMinutes() === 0);
    let horarioNoche = this.horario.getHours() === 20 || (this.horario.getHours() === 21 && this.horario.getMinutes() === 0);
    if(horarioDia || horarioNoche) {
        return precioBase * .05;
    };
    return 0;
}

Reserva.prototype.descuentos = function(precioBase) {
    return this.descuentoPorGrupo(precioBase) + this.descuentoCodigo(precioBase);
}

Reserva.prototype.descuentoPorGrupo = function(precioBase) {
    let descuento = 0;
    if(this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6) {
        descuento = .05;
    } else if(this.cantidadPersonas >= 7 && this.cantidadPersonas <= 8) {
        descuento = .10;
    } else if(this.cantidadPersonas > 8) {
        descuento = .15;
    }
    return precioBase * descuento;
}

Reserva.prototype.descuentoCodigo = function(precioBase) {
    let descuento = 0;
    if(this.codigoDescuento === "DES15") {
        descuento = precioBase * .15;
    } else if(this.codigoDescuento === "DES200") {
        descuento = 200;
    } else if(this.codigoDescuento === "DES1") {
        descuento = this.precioPersonas;
    }
    return descuento;
}