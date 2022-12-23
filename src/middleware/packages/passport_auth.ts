import { GoogleOneTapStrategy } from 'passport-google-one-tap';
import passport from 'passport';
import { config } from '../../config/confing_mock';

passport.use(
    new GoogleOneTapStrategy(
      {
        clientID: config.system.envirnment.GOOGLE_CLIENT_ID, // your google client ID
        clientSecret: config.system.envirnment.GOOGLE_CLIENT_SECRET, // your google client secret
        verifyCsrfToken: false, // whether to validate the csrf token or not
      },
      function (profile, done) {
        const return_error=false
        if (return_error) {
            return done(new Error('Error in authentication'));
        }else{
            return done(null, profile);
        }
      }
    )
  );


  const someFunction = (props: any) => {
    
    retriveSpecificDataFromProps(props);

    /**
     * do alot of stuff here
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */

  }

function retriveSpecificDataFromProps(props: any) {
    const recordDataPrice = props.data.security.recordDatePrice;
    const closingPrice = props.data.security.closingPrice;
    const change = recordDataPrice - closingPrice;
    const dataToRender = [
        { name: 'Record Date Price', value: recordDataPrice },
        { name: 'Closing Price', value: closingPrice },
        { name: 'Change', value: change },
    ];
}
