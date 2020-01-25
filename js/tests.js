let expect = chai.expect;

describe("Test sobre reserva de horario", function () {
    it("Se elimina el horario elegido del array", function () {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        restaurant.reservarHorario("13:00");
        expect(restaurant.horarios).to.eql(["15:30", "18:00"]);
        expect(restaurant.horarios.length).to.equal(2);
    })

    it("Debería mantenerse igual el array de horarios disponibles del restaurant cuando se reserva un horario que éste no posee.", function() {
        let restaurant =  new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
        restaurant.reservarHorario("14:00");
        expect(restaurant.horarios).to.eql(["15:00", "14:30", "12:30"]);
        expect(restaurant.horarios.length).to.equal(3);
    })

    it("Debería mantenerse igual el array de horarios disponibles del restaurant cuando no se selecciona ningun horario.", function() {
        let restaurant =  new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        restaurant.reservarHorario();
        expect(restaurant.horarios).to.eql(["11:30", "12:00", "22:30"]);
        expect(restaurant.horarios.length).to.equal(3);
    })
})

describe("Test sobre la obtención de puntuación", function() {
    it("La puntuación de un restaurant con diversas calificaciones esta bien promediada", function() {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        let obtenidos = restaurant.obtenerPuntuacion();
        expect(obtenidos).to.equal(7.4);
    })

    it("La puntuación de un restaurant sin calificaciones será de 0", function() {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", []);
        let obtenidos = restaurant.obtenerPuntuacion();
        expect(obtenidos).to.equal(0);
    })
})

describe("Test sobre calificaciones al restaurant", function() {
    it("La nueva calificación cumple con las condiciones para ser agregada", function() {
        let restaurantElegido = listado.restaurantes[2];
        let arrCalificaciones = listado.restaurantes[2].calificaciones.length; //antes de calificar
        restaurantElegido.calificar(9);
        let nuevoArrCalificaciones = listado.restaurantes[2].calificaciones.length; //luego de calificar
        expect(nuevoArrCalificaciones).to.eql(arrCalificaciones + 1);
    })

    it('La nueva calificación debe ser un número', function () {
        let calificacionEsperada = 10;
        expect(calificacionEsperada).to.be.a('number');
    })

    it('La nueva calificación es menor a 1 y por ende no deberia registrarse', function () {
        let listadoRestaurante = listado.restaurantes[3];
        let arrayDeCalificaciones = listado.restaurantes[3].calificaciones.length; //antes de calificar
        listadoRestaurante.calificar(0);
        let nuevoArrayCalificandoCero = listado.restaurantes[3].calificaciones.length; //luego de calificar
        //comparo el array nuevo con el anterior para corroborar que no haya aumentado su largo
        expect(nuevoArrayCalificandoCero).to.equal(arrayDeCalificaciones);
    })

    it('La nueva calificación es mayor a 10 y por ende no deberia registrarse', function () {
        let listadoRestaurante = listado.restaurantes[3];
        let arrayDeCalificaciones = listado.restaurantes[3].calificaciones.length;
        listadoRestaurante.calificar(11);
        let nuevoArrayCalificandoCero = listado.restaurantes[3].calificaciones.length;
        //comparo el array nuevo con el anterior para corroborar que no haya aumentado su largo
        expect(nuevoArrayCalificandoCero).to.equal(arrayDeCalificaciones);
    })
})

describe("Test sobre la busqueda de un restaurant a traves de un id", function() {
    it("El id ingresado corresponde a un restaurant de la lista", function() {
        const idRestaurante = listado.restaurantes[4].id;
        expect(idRestaurante).to.equal(5);
    })

    it("El id ingresado no corresponde a un restaurant de la lista", function() {
        let ft = listado.buscarRestaurante(30);
        expect(ft).to.equal('No se ha encontrado ningún restaurant');
    })

    it("Se debería arrojar el mensaje 'No se ha encontrado ningún restaurant' si el id pasado por parámetro no es un número.", () => {
        let listadoDeRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listado = new Listado(listadoDeRestaurantes);
        let ft = listado.buscarRestaurante("id"); //probamos un string "id"
        expect(ft).to.equal('No se ha encontrado ningún restaurant');
    })
    
    it("Se debería arrojar 'No se ha encontrado ningún restaurant' cuando no se le pasa ningún id por parámetro", () => {
        let listadoDeRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listado = new Listado(listadoDeRestaurantes);
        let ft = listado.buscarRestaurante(); //probamos un string "id"
        expect(ft).to.equal('No se ha encontrado ningún restaurant');
    })
})

describe("Test sobre la obtención de un restaurante al filtrar entre diversos factores", function() {
    it("Se retorna un restaurante utilizando todos los filtros posibles", function() {
        let restauranteFiltrado = listado.obtenerRestaurantes("Ensalada", "París", "11:00");
        expect(restauranteFiltrado[0].nombre).to.eql("Chez Moi");
    })

    it("Se retornan restaurantes utilizando dos filtros posibles", function() {
        let restauranteFiltrado = listado.obtenerRestaurantes("Pasta", "Roma", null);
        expect(restauranteFiltrado[0].nombre).to.equal("Osteria Da Fortunata", "Pastasciutta");
    })

    it("Se retornan restaurantes utilizando solo un filtro posible", function() {
        let restauranteFiltrado = listado.obtenerRestaurantes("Pasta", null, null);
        expect(restauranteFiltrado[0].nombre).to.equal("Osteria Da Fortunata", "Pastasciutta", "La Trottinette", "Carmine's", "Vapiano");
    })
})

describe("Test sobre precios de reserva", function() {
    it("Se valida el precio base de una reserva", function() {
        let reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"); //(horario, personas, precioPorPersona, codigoDescuento)
        expect(reserva1.precioBase()).to.equal(2800);
    })

    it("Se valida el precio final de una reserva", function() {
        let reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
        expect(reserva2.precioTotal()).to.equal(100);
    })
})