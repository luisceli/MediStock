import { Platform } from "react-native";

let baseUrl='';

{Platform.OS== 'android'
 baseUrl = 'http://192.168.1.45:3000/api/v1/'
}

export default baseUrl;