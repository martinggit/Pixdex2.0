import { BotonPix } from "@/components/BotonPix";
import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Etiqueta } from "@/components/Etiqueta";

export default function ContenidoSlugRoute() {
  const { id } = useLocalSearchParams(); // ← Accede a /detail/LOQUESEA
  const router = useRouter();
  const navigation = useNavigation();

  const { contenidos, generos, tipos } = useContext(AudiovisualesContext);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); 
    }
  };

  // Buscar el contenido usando el contexto
  const contenido = contenidos.find((item) => item.nombre === id);

  // Mapear los ids de géneros del contenido con los nombres del contexto
  const generosNombres = contenido?.generos.map(
    (generoId) => generos.find((g) => g.id === generoId)?.nombre
  );

  // Buscar el tipo singular en contexto
  const tipoNombre = tipos.find((t) => t.id === contenido?.tipoId)?.singular;

  if (!contenido) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#fff" }}>Contenido no encontrado</Text>
      </View>
    );
  }

  return (
<ScrollView style={[styles.screenContainer]}
 contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <BotonPix
          text="VOLVER"
          iconName="arrow-back"
          onPress={handleBack}
          iconFamily="Ionicons"
        />
      </View>
        <View style={styles.borde}>
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: "black", textAlign: "center" }}>{id}</Text>
          </View>
        
          <Text style={styles.slugTitle}>{contenido?.nombre}</Text>
        
        <View style={{ marginLeft: 20, marginBottom: 15 }}>
          {tipoNombre && <Etiqueta texto={tipoNombre} variant="detalle" />}
        </View>

        <Text style={styles.description}>{contenido?.descripcion}</Text>
        
        <Text style={styles.genresTitle}>Generos</Text>
        <View style={styles.genreList}>
          {generosNombres
            ?.filter((g): g is string => typeof g === "string")
            .map((genero, index) => (
              <Etiqueta key={index} texto={genero} variant="detalle" />
          ))}
        </View>

        </View>
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { 
    padding: 20,
    backgroundColor: colors.fondo,
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  borde:{
    alignSelf:"center",
    width:"95%", 
    borderWidth:3, 
    borderColor: colors.grisOscuro, 
    marginTop:30,
    paddingBottom:20,
  },
  imagePlaceholder: {
    height: 450,
    width: "90%",
    marginTop:20,
    backgroundColor: "#BEBEBE",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
  },
  slugTitle: {
    fontSize: 20,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginBottom: 10,
    lineHeight: 24,
    marginLeft:20,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    marginLeft:20,
    marginRight:20,
  },
  genresTitle: {
    color: colors.verde,
    fontSize: 14,
    fontFamily: "PixelFont",
    marginBottom: 10,
    marginLeft:20,
  },
  genreList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginLeft:20,
  },
});