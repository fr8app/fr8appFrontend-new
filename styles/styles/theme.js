import { createMuiTheme } from '@material-ui/core';
const  Colors = {
    'white': '#ffffff',
    'black': '#000000',
    'primary': '#196EA1',
    'breadcrumb':"#222222",
    '--forgot-text': '#555',
    'title': '#3C4858',
    'greyIcon':'#a9afbb',
    'dashboardCards':"#333333",
    'coolBlue':"#f6f7fa",
}


const theme = createMuiTheme({
    overrides:{
        MuiInputBase:{
            input:{
                padding: "10px 12px",
                border:"1px solid #d2d2d2",
                borderRadius: '3px !important',
                fontSize: 14,
                fontWeight: 500,
                color:'#555555',
                lineHeight: "normal",
            },
            multiline:{
                padding:0,
            }
        },
        MuiInput:{
            underline:{
                '&:before':{
                            borderBottom: 0, 
                        },
                '&:after':{
                    left: 1,
                    right: 1,
                    content: "",
                    position: "absolute",
                    transform: "scaleX(0)",
                    transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                    borderBottom: `2px solid ${Colors.primary}`,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                }
            },
            inputMultiline:{
                padding:'10px 12px',
            }
    },
    MuiListItem:{
        root:{
            paddingTop:0,
            paddingBottom:0,
        },
        gutters:{
            paddingLeft:0,
            paddingRight:0,
        },
    },
    MuiDrawer:{
        paperAnchorDockedLeft:{
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2) !important',
        }
    },
    MuiDivider:{
        middle:{
            marginLeft:'10%',
            marginRight:'10%',
        }
    },
    MuiButton:{
        label:`${Colors.primary} !important`,
        '& :focus':{
            outline:'none !important',
        }
    },
    MuiFormHelperText:{
        root:{
            fontSize:'14px !important',
            marginLeft:3,
        }
    },
    MuiTypography:{
        subtitle1: {
            color:Colors.breadcrumb,
            fontSize:19,
            lineHeight:1,
        },
    },
    MuiPaginationItem:{
        textPrimary: {
            fontWeight:500,
            fontSize:14,
            color:Colors.primary,
        }
    },
    MuiContainer:{
        maxWidthMd:{
            // maxWidth:'100% !important'
        }
    }
    },
    palette:{
        primary:{
            main:Colors.primary,
        }
    },
});

export default theme;