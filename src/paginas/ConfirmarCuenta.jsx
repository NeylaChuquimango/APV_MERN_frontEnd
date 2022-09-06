import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  // console.log(params);
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;

        const { data } = await clienteAxios(url);
        // console.log(data);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-pink-500 font-black text-6xl">
          Confirma tu Cuenta en Administrar {""}
          <span className="text-cyan-600">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Inicia Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
