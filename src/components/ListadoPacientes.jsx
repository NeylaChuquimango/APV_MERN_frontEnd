import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  console.log(pacientes);

  return (
    
    <>
      {pacientes.length ? (
        <>
         <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administrar Pacientes y Citas</p>

          {pacientes.map(paciente => (
            <Paciente
            key={paciente._id}
            paciente={paciente}
            />
          ) )}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comienza agregado pacientes</p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
