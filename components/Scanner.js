import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code is ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Scanner;

// import React, { useState } from 'react';
// import { StyleSheet, View, Button, Text } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera/next';
// import { StatusBar } from 'expo-status-bar';

// function TestScreen() {
//   // const [facing, setFacing] = useState('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [barcode, setBarcode] = useState('');

//   if (!permission) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting camera permission</Text>
//       </View>
//     );
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text>Access to camera has been denied</Text>
//       </View>
//     );
//   }
//   const handleBarCodeScanned = ({ type, data }) => {
//     try {
//       if (type === 'org.gs1.EAN-13') {
//         setBarcode(data);
//         console.log(`Barcode with type ${type} and data ${data} has been scanned!`);
//       }
//     } catch (error) {
//       console.error("Failed to scan barcode", error);
//     }
//   };

//     // // Request camera permission
//     // const { status } = useCameraPermissions();
//     // if (!status) {
//     //   requestPermission();
//     // }
//     // if (status === 'granted') {
//     //   // Handle barcode detection
//     //   const handleBarCodeScanned = ({ type, data }) => {
//     //     if (type === 'org.gs1.EAN-13') {
//     //       setBarcode(data);
//     //       console.log(`Barcode with type ${type} and data ${data} has been scanned!`);
//     //     }
//     //   };
//     // }
//     // if (status === 'denied') {
//     //   return (
//     //     <View style={styles.container}>
//     //         <Text>Access to camera has been denied</Text>
//     //     </View>
//     //   );
//     // }

//     return (
//         <View style={styles.container}>
//             <CameraView
//                 style={styles.camera}
//                 onBarCodeScanned={handleBarCodeScanned}
//                 barcodeScannerSettings={{
//                     barcodeTypes: ['org.gs1.EAN-13'],
//                 }}
//             >
//                 <Text>{barcode}</Text>
//             </CameraView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     camera: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     }
// });

// export default TestScreen;