import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import ItemComponent from "@/components/ItemInformation";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import IngredientSummary from "@/components/aiSummary";

const { width, height } = Dimensions.get("window");
const scopeSize = 300;

export default function App() {
  const [flash, setFlash] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [itemData, setItemData] = useState<{
    imageSource: string;
    title: string;
    rating: string;
  } | null>(null);
  const [ingredients, setIngredients] = useState<string | null>(null);
  const [allergens, setAllergens] = useState<string[]>([]);
  const deviceip = process.env.EXPO_PUBLIC_DEVICEIP;

  const expandedScaleY = useRef(new Animated.Value(0)).current;
  const expandedOpacity = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(height)).current; // Initial position off-screen (bottom)

  const moreInfoTranslateY = useRef(new Animated.Value(height)).current;

  const handleFlash = () => {
    setFlash((prev) => !prev);
  };

  const handleMoreInfo = () => {
    if (!moreInfo) {
      setMoreInfo(true);
    } else {
      Animated.timing(moreInfoTranslateY, {
        toValue: height, // Slide down to hide the more info box
        duration: 500,
        useNativeDriver: true,
      }).start(() => setMoreInfo(false));
    }
  };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (scanned && itemData) {
      Animated.timing(translateY, {
        toValue: 0, // Final position
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height, // Move it back off-screen
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true,
      }).start();
    }
  }, [scanned, itemData]);

  useEffect(() => {
    if (moreInfo) {
      Animated.timing(moreInfoTranslateY, {
        toValue: 0, // Slide up to show the more info box
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(moreInfoTranslateY, {
        toValue: height, // Slide down to hide the more info box
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [moreInfo]);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    axios
      // Update the URL to match the IP address of your backend server
      .get(`http://${deviceip}:5050/search/${data}`)
      .then((response) => {
        setItemData({
          imageSource: response.data.image_url,
          title: response.data.product_name,
          rating: response.data.brands,
        });
        setIngredients(response.data.ingredients_text_en);
        const allergensArray = response.data.allergens
          .split(",")
          .map((allergen) => allergen.trim().slice(3));

        if (allergensArray[0] === "") {
          setAllergens(["None"]);
        } else {
          setAllergens(allergensArray);
        }
      })
      .catch((error) => {
        setItemData({
          imageSource: "https://via.placeholder.com/50",
          title: data,
          rating: "Unable to fetch data",
        });
        setIngredients(null);
      });
  };

  const handleScanAgain = () => {
    Animated.timing(translateY, {
      toValue: height, // Move it back off-screen
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start(() => {
      setScanned(false);
      setItemData(null);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "aztec",
            "ean13",
            "ean8",
            "qr",
            "pdf417",
            "upc_e",
            "code39",
            "code93",
            "code128",
            "codabar",
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      {/*Camera Box*/}
      <View style={[styles.overlay, { height: (height - scopeSize) / 2 }]} />
      <View style={styles.middleRow}>
        <View style={[styles.overlay, { width: (width - scopeSize) / 2 }]} />
        <View style={styles.scope}>
          {/* Text added here to be inside the scan box */}
          <View style={styles.textInsideScope}>
            <Text style={styles.whiteText}>Scan Barcode</Text>
          </View>
        </View>
        <View style={[styles.overlay, { width: (width - scopeSize) / 2 }]} />
      </View>
      <View style={[styles.overlay, { height: (height - scopeSize) / 2 }]} />

      {/*Info Box*/}
      {scanned && itemData && (
        <Animated.View
          style={[styles.itemContainer, { transform: [{ translateY }] }]}
        >
          <Pressable onPress={() => handleMoreInfo()}>
            <AntDesign name="up" size={24} color="black" />
          </Pressable>

          <ItemComponent
            imageSource={itemData.imageSource}
            title={itemData.title}
            rating={itemData.rating}
          />
          <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
        </Animated.View>
      )}

      {/*More Info Box*/}
      {moreInfo && itemData && (
        <Animated.View
          style={[
            styles.itemContainerExpanded,
            { transform: [{ translateY: moreInfoTranslateY }] },
          ]}
        >
          <View style={styles.downArrow}>
            <Pressable onPress={() => handleMoreInfo()}>
              <AntDesign name="down" size={24} color="black" />
            </Pressable>
          </View>

          <ItemComponent
            imageSource={itemData.imageSource}
            title={itemData.title}
            rating={itemData.rating}
          />
          <IngredientSummary ingredients={ingredients} allergens={allergens} />

          <View style={{ marginTop: "auto" }}>
            <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
          </View>
        </Animated.View>
      )}
      <Pressable
        style={flash ? styles.flashButtonOn : styles.flashButtonOff}
        onPress={handleFlash}
      >
        <Ionicons
          name="flashlight"
          size={24}
          color={flash ? "white" : "#FF7F3E"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInsideScope: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 2,
  },
  textContainer: {
    alignItems: "center",
  },
  whiteText: {
    color: "#FF7F3E",
    fontSize: 20,
    margin: 5,
  },
  scopeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scope: {
    width: 300,
    height: 200,
    borderColor: "white",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 3,
  },
  itemContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemContainerExpanded: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    height: height * 0.7, // Set the maximum height
    backgroundColor: "#fff",

    transform: [{ translateY: height }], // Initial position off-screen
  },
  flashButtonOn: {
    backgroundColor: "gray",
    position: "absolute",
    left: 20,
    top: 60,
    padding: 15,
    borderRadius: 100,
  },
  flashButtonOff: {
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    top: 60,
    padding: 15,
    borderRadius: 100,
  },

  downArrow: {
    alignItems: "center",
  },
});
