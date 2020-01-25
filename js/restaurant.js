var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

// Restaurant.prototype.reservarHorario = function(horarioReservado) {
//     for (var i = 0; i < this.horarios.length; i++) {
//         if (this.horarios[i] === horarioReservado) {
//             this.horarios.splice(i, 1);
//             return; 
//         }
//     }
// }

//new refactored function with filter
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    let horarioElegido = this.horarios.filter(function(horario) {
        return horario !== horarioReservado;
    })
    this.horarios = horarioElegido;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}


//new modularization in obtenerPuntuación
function sumatoria(numeros) {
    //var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; });
    // total == 6
    return numeros.reduce(function(a, b) {
        return a + b;
    });
}

function promedio(aPromediar) {
    return (sumatoria(aPromediar)) / aPromediar.length;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if(this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}
//without modularization 
//     if (this.calificaciones.length === 0) {
//         return 0;
//     } else {
//         var sumatoria = 0;
//         for (var i = 0; i < this.calificaciones.length; i++) {
//             sumatoria += this.calificaciones[i]
//         }
//         var promedio = sumatoria / this.calificaciones.length;
//         return Math.round(promedio * 10) / 10;
//     }   
