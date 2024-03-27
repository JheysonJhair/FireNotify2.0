import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 

const Info = ({ title, ubicacion }) => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const anio = fechaActual.getFullYear();
      const horaActual = fechaActual.getHours();
      const minutos = fechaActual.getMinutes();
      const segundos = fechaActual.getSeconds();

      const fechaFormateada = `${dia}/${mes}/${anio}`;
      const horaFormateada = `${horaActual}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

      setFecha(fechaFormateada);
      setHora(horaFormateada);
    };

    obtenerFechaHoraActual();

    const intervalo = setInterval(obtenerFechaHoraActual, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View>
      <Text style={styles.h2}>{title}</Text>
      <View style={styles.containerMap}>
      <Icon name="check-circle" size={20} color="black" style={styles.icon} />
        <Text style={styles.h33}>{ubicacion}</Text>
      </View>
      <View style={styles.containerDateTime}>
        <Text style={styles.dateTime}>{fecha}</Text>
        <Text style={styles.dateTime}>{hora}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerMap: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  containerDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  h2: {
    fontSize: 19,
    fontWeight: "bold",
  },
  h33: {
    fontSize: 14,
    marginLeft: 10,
    color: "#FF9800",
    fontWeight: "bold",
  },
  dateTime: {
    fontSize: 16,
    color: "#073a3f",
    fontWeight: "bold",
  },
};

export default Info;
