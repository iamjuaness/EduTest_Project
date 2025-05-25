export const USERS = [
    {
      email: "profesor@colegio.edu",
      password: "1234",
      role: "teacher",
      name: "Profe Juan"
    },
    {
      email: "estudiante@colegio.edu",
      password: "1234",
      role: "student",
      name: "Estudiante Ana"
    }
  ];
  
  export const EXAMS = [
    // Ejemplo de examen ya creado
    {
      id: 1,
      nombre: "Examen de Matemáticas",
      descripcion: "Prueba de conceptos básicos",
      asignados: ["estudiante@colegio.edu"],
      preguntas: [
        {
          tipo: "opcion_unica",
          pregunta: "¿Cuánto es 2+2?",
          opciones: ["3", "4", "5"],
          respuesta: 1
        },
        {
          tipo: "verdadero_falso",
          pregunta: "El número 5 es mayor que 10.",
          respuesta: false
        }
      ],
      submissions: []
    }
  ];
  