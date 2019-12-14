export default {
  
    palette: {
      primary: { main: '#546E7A',
                 contrastText: '#fff' },
      secondary: {    light: '#ff6f33',
                      main: '#b63208',
                      dark: '#b22a00',
                      contrastText: '#fff' },
    },
    rest: {
      typography: {
        useNextVariants: true,
      },
      form: {
        textAlign: 'center'
      },
      image: {
          margin: '0px auto',
          width: '100px',
      },
      pageTitle: {
          margin: '0px auto',
        
      },
      textField: {
          margin: '5px auto',
      },
      button: {
          marginTop: '20px',
          position: "relative"
      },
      customError: {
        color: 'red',
          fontSize: '1rem',
          marginTop: '10px',
      },
      small: {
          color: 'textSecondary',
          fontSize: '1rem',
          margin: '20px auto',
          height: '1875em',
      },
      progress: {
          position: 'absolute',
      },
    },
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 20px auto'
    },
    pageTitle: {
      margin: '10px auto 10px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
    
  }
