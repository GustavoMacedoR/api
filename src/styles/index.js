import colors from './colors';
import fonts from './fonts';
import metrics from './metrics';
import {StyleSheet} from 'react-native'


var styles = StyleSheet.create({
    container: {
      margin: metrics.padding ,
    },
    titulo:{
        color:colors.dark,
        fontSize: fonts.bigger,
        fontWeight: 'bold',
    },
    subtitulo:{
        color:colors.regular,
        fontSize: fonts.regular,
    },
    subtituloSimple:{
      color:colors.info,
      fontSize: fonts.big,
  }
    
  });


export { colors, fonts, metrics,styles };
