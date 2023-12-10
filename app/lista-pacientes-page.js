const observableModule = require("@nativescript/core/data/observable");
const dialogs = require("@nativescript/core/ui/dialogs");
const applicationSettings = require("@nativescript/core/application-settings");

let viewModel;

function obtenerPacientesGuardados() {
  try {
    const pacientesString = applicationSettings.getString("pacientes", "[]");
    return JSON.parse(pacientesString);
  } catch (error) {
    console.error("Error al analizar los datos de pacientes:", error);
    return [];
  }
}

function guardarPacientes(pacientes) {
  const pacientesString = JSON.stringify(pacientes);
  applicationSettings.setString("pacientes", pacientesString);
  console.log("Datos Guardar:", pacientesString);
}

function pageLoaded(args) {
  const page = args.object;
  viewModel = observableModule.fromObject({
    pacientes: obtenerPacientesGuardados()
  });
  console.log("Datos cargados:", JSON.stringify(viewModel.pacientes));
  page.bindingContext = viewModel;
}


function onItemTap(args) {
  // Lógica al tocar un elemento en la lista
  console.log("Elemento tocado:", viewModel.pacientes[args.index]);
}
function eliminarPaciente(args) {
  const pacienteIndex = args.index;
  dialogs.confirm({
    title: "Eliminar Paciente",
    message: "¿Está seguro de que desea eliminar este paciente?",
    okButtonText: "Sí",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result) {
      viewModel.pacientes.splice(pacienteIndex, 1);
       // Guardar la lista actualizada después de eliminar un paciente
      guardarPacientes(viewModel.pacientes);
    }
  });
}
function irAgregarPaciente () {
  const frameModule = require("@nativescript/core/ui/frame");
  frameModule.topmost().navigate("main-page");
}
module.exports = {
  pageLoaded,
  onItemTap,
  eliminarPaciente,
  irAgregarPaciente,
  obtenerPacientesGuardados
};
