import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setconfirmarPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Enviando formulario');

    if ([nombre, email, password, confirmarPassword].includes("")) {
      // console.log('hay campos vacios');
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== confirmarPassword) {
      // console.log('los password no son iguales');
      setAlerta({ msg: "El password no coincide", error: true });

      return;
    }
    if (password.length < 6) {
      // console.log('el password es muy corto');
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      return;
    }
    setAlerta({});

    //Crear el usuario en la api

    try {
      // const respuesta = await axios.post(url, {nombre, email, password})
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      // console.log(respuesta);
      setAlerta({
        msg: "Registrado correctamente, revisar email",
        error: false,
      });
    } catch (error) {
      // console.log(error.response);
      setAlerta({
        // msg: error.response.data.msg,
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-pink-500 font-black text-6xl">
          Crear Cuenta Administrar {""}
          <span className="text-cyan-600">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-blue-900 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresar nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-blue-900 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingrese su email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-blue-900 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Ingrese su password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-blue-900 block text-xl font-bold">
              Confirmar Password
            </label>
            <input
              type="password"
              placeholder="Confirmar su password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={confirmarPassword}
              onChange={(e) => setconfirmarPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-pink-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-pink-700 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesion
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
