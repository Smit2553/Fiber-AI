import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import { CameraView, Camera, FlashMode } from "expo-camera";
import ItemComponent from "@/components/ItemInformation";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const scopeSize = 300;

export default function App() {
  const [flash, setFlash] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [itemData, setItemData] = useState<{
    imageSource: string;
    title: string;
    rating: string;
  } | null>(null);

  const handleFlash = () => {
    setFlash((prev) => !prev);
    console.log(flash);
  };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    axios
      // Update the URL to match the IP address of your backend server
      .get(`http://10.56.224.52:5050/search/${data}`)

      .then((response) => {
        setItemData({
          imageSource: response.data.image_url,
          title: response.data.product_name,
          rating: response.data.code,
        });
      })
      .catch(function (error) {
        console.log(error);
        setItemData({
          imageSource: "https://via.placeholder.com/50",
          title: data,
          rating: "0/100",
        });
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

      <Pressable
        style={styles.scopeContainer}
        onPress={() => setScanned(false)}
      >
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
      </Pressable>
      {scanned && itemData && (
        <View style={styles.itemContainer}>
          <ItemComponent
            imageSource={itemData.imageSource}
            title={itemData.title}
            rating={itemData.rating}
          />
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
      <Pressable
        style={flash ? styles.flashButtonOn : styles.flashButtonOff}
        onPress={handleFlash}
      >
        <Ionicons name="flashlight" size={24} color="black" />
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
    color: "white",
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
  },
  flashButtonOn: {
    backgroundColor: "gray",
    position: "absolute",
    left: 20,
    top: 80,
    padding: 15,
    borderRadius: 100,
  },
  flashButtonOff: {
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    top: 80,
    padding: 15,
    borderRadius: 100,
  },
});
