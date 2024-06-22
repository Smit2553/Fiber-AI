import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import ItemComponent from "@/components/ItemInformation";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [itemData, setItemData] = useState<{
    imageSource: string;
    title: string;
    rating: string;
  } | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    axios
      // Update the URL to match the IP address of your backend server
      .get(`http://10.56.21.241:5050/search/${data}`)

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  itemContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
});
