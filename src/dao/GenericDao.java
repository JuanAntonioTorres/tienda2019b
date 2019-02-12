package dao;

import dao.rol.Rol;
import reflection.RsTransferArrayList;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

public class GenericDao {
	private final String PACKAGE_ROLES = "dao.rol.";
	private final String SUBFIJO_ROLES = "Rol";
	private int posicionParamSalida;
	CallableStatement callableStatement;

	public Object execProcedure(String nombreProcedure, Object... objects)throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException,
			IllegalArgumentException, InvocationTargetException, ParseException {

		this.posicionParamSalida = 0;

		Connection conexion = generarRol(objects[0]).getConnection();

		String llamada = construirLlamada(nombreProcedure, conexion);

		this.callableStatement = conexion.prepareCall(llamada);

		prepararParametros(nombreProcedure, conexion, objects);

		if (hayRetornoEnLaProcedure()) {
			callableStatement.executeQuery();
			return obtenerRetornoDeProcedure();
		} else {
			return obtenerListaDeObjetos(objects[0]);
		}
	}


	private ArrayList<?> obtenerListaDeObjetos(Object object) throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException, InvocationTargetException, ParseException {
		return new RsTransferArrayList().getListGenericObject(callableStatement, object.getClass().getName());
	}

	private Object obtenerRetornoDeProcedure() throws SQLException {
		return callableStatement.getObject(posicionParamSalida);
	}

	private boolean hayRetornoEnLaProcedure() {
		return posicionParamSalida > 0;
	}

	private void prepararParametros(String nombreProcedure, Connection conexion, Object[] objects) throws SQLException, IllegalAccessException, InvocationTargetException, InstantiationException {

		int numeroParametros = getParameterCount();

		for (int i = 1; i <= numeroParametros; i++) {
			if (isParametroDeEntrada(i)) {
				asignarValorParametro(nombreProcedure, conexion, objects, i);
			}
			else if (isParametroDeSalida(i)) {
				registrarPosicionParametroSalida(i);
			}
		}
	}

	private void registrarPosicionParametroSalida(int i) throws SQLException {
		callableStatement.registerOutParameter(i, callableStatement.getParameterMetaData().getParameterType(i));
		posicionParamSalida = i;
	}

	private boolean isParametroDeSalida(int i) throws SQLException {
		return callableStatement.getParameterMetaData().getParameterMode(i) == 4;
	}

	private void asignarValorParametro(String nombreProcedure, Connection conexion, Object[] objects, int i) throws SQLException, IllegalAccessException, InvocationTargetException, InstantiationException {
		callableStatement.setObject(i, buscarValorParametro(conexion, i, objects, nombreProcedure),
				callableStatement.getParameterMetaData().getParameterType(i));
	}

	private int getParameterCount() throws SQLException {
		return callableStatement.getParameterMetaData().getParameterCount();
	}

	private boolean isParametroDeEntrada(int i) throws SQLException {
		return callableStatement.getParameterMetaData().getParameterMode(i) == 1;
	}

	private Rol generarRol(Object object) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		return (Rol) Class.forName(PACKAGE_ROLES + object.getClass().getSimpleName() + SUBFIJO_ROLES).newInstance();
	}

	private int obtenerNumeroParametros(String nombreProcedure, Connection conexion) throws SQLException {
		ResultSet rs = conexion.getMetaData().getProcedureColumns(null, null, nombreProcedure.toUpperCase(), "%");
		int contador = 0;
		while (rs.next()) {
			contador++;
		}
		return contador;
	}

	private Object buscarValorParametro(Connection conexion, int posicionParametro, Object[] objects,
			String nombreProcedure) throws SQLException, IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, InstantiationException {
		for (int objPosition = 0; objPosition < objects.length; objPosition++) {
			Method[] declaredMethod = objects[objPosition].getClass().getMethods();
			String nombreParametro = buscarNombreParametro(conexion, posicionParametro, nombreProcedure);
			for (int i = 0; i < declaredMethod.length; i++) {
				if (declaredMethod[i].getName().toLowerCase().equals("get" + nombreParametro.toLowerCase())) {
					return declaredMethod[i].invoke(objects[objPosition]);
				}
			}
		}
		return null;
	}

	private String buscarNombreParametro(Connection conexion, int posicionParametro, String nombreProcedure)
			throws SQLException {
		ResultSet rs = conexion.getMetaData().getProcedureColumns(null, null, nombreProcedure.toUpperCase(), "%");
		int contador = 1;
		while (rs.next()) {
			if (contador == posicionParametro) {
				return rs.getString(4);
			}
			contador++;
		}
		return null;
	}

	private String construirLlamada(String nombreProcedure, Connection conexion) throws SQLException {
		StringBuilder llamada = new StringBuilder();
		llamada.append("{call " + nombreProcedure);
		int numeroParametros = obtenerNumeroParametros(nombreProcedure, conexion);
		if (numeroParametros>0) {
			llamada.append("(");
			for (int i = 0; i < numeroParametros; i++) {
				llamada.append("?,");
			}
			llamada.delete(llamada.length() - 1, llamada.length() - 0);
			llamada.append(")");
		}
		llamada.append("}");
		return new String(llamada);
	}

}
