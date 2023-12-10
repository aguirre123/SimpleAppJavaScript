const observableModule = require("@nativescript/core/data/observable");
const dialogs = require("@nativescript/core/ui/dialogs");
const applicationSettings = require("@nativescript/core/application-settings");

let viewModel;

function pageLoaded(args) {
  const page = args.object;
  viewModel = observableModule.fromObject({
    pacientes: [],
    nuevoPaciente: {
      nombre: "",
      apellido: "",
      edad: "",
      telefono: "",
      identificacion: ""
    }
  });
  console.log("Datos loaded:", JSON.stringify(viewModel.pacientes));
  page.bindingContext = viewModel;
}

function guardarPacientes(pacientes) {
  const pacientesString = JSON.stringify(pacientes);
  applicationSettings.setString("pacientes", pacientesString);
  console.log("Datos Guardar:", pacientesString);
}

function agregarPaciente() {
  const nuevoPaciente = viewModel.get("nuevoPaciente");

  if (
    nuevoPaciente.nombre &&
    nuevoPaciente.apellido &&
    nuevoPaciente.edad &&
    nuevoPaciente.telefono &&
    nuevoPaciente.identificacion
  ) {
    viewModel.pacientes.push(Object.assign({}, nuevoPaciente));

     // Guardar la lista actualizada
    guardarPacientes(viewModel.pacientes);

    // Limpiar el formulario después de agregar un paciente
    viewModel.set("nuevoPaciente", {
      nombre: "",
      apellido: "",
      edad: "",
      telefono: "",
      identificacion: ""
    });
  } else {
    dialogs.alert("Por favor, complete todos los campos.");
  }
}


function irAListaPacientes () {
  const frameModule = require("@nativescript/core/ui/frame");
  frameModule.topmost().navigate("lista-pacientes-page");
}



exports.pageLoaded = pageLoaded;
exports.agregarPaciente = agregarPaciente;
exports.irAListaPacientes = irAListaPacientes;

