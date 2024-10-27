export function generateEmailTemplateForVerifyCode(
  user_name: any,
  verification_code: any,
) {
  return ` <html lang='en'>

  <head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Document</title>
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
    <link
      href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      rel='stylesheet'
    />
    <style>
      @import
      url("https://fonts.googleapis.com/css2?family=Rubik:wght@800&display=swap");
      body { background: #f3f2f7 0% 0% no-repeat padding-box; } .emailContent {
      width: 600px; height: 534px; padding: 20px; /* UI Properties */
      background: #f9fafc 0% 0% no-repeat padding-box; box-shadow: 0px 0px 3px
      #00000029; opacity: 1; } .header h1 { margin-top: 46px; font: normal
      normal bold 20px/24px Rubik; letter-spacing: 0px; text-align: left; color:
      #16285e; text-transform: capitalize; opacity: 1; } .code { font: normal
      normal bold 14px/20px Rubik; letter-spacing: 0px; color: #16285e;
      text-transform: capitalize; opacity: 1; } .footerContact {
      text-decoration: none; font: normal normal normal 14px/24px Rubik;
      letter-spacing: 0px; color: #16285e; padding-left: 5px; } .main p { font:
      normal normal normal 14px/20px Rubik; letter-spacing: 0px; text-align:
      left; color: #000000; opacity: 1; } .footerLink { text-decoration: none;
      font: normal normal normal 12px/14px Rubik; letter-spacing: 0px; color:
      #16285e; text-transform: capitalize; } .footerLink h4 { margin-top: 0px
      !important; } .contentDiv { width: 50%;} @media (max-width: 1200px) {.contentDiv { width: 85% !important;}}
    </style>
  </head>

  <body>
    <table style='width: 100%'>
      <tr height='60'></tr>
      <tr>
        <td>
          <center>
            <table
            class='contentDiv'
              style='
                                text-align: center;
                               
                                margin: 0 auto;
                            '
            >
              <thead>
                <tr
                  style='
                                        padding: 20px;
                                        background: #f9fafc 0% 0% no-repeat
                                            padding-box;
                                        margin: 0px auto;
                                        max-width: 600px;
                                    '
                >
                  <td
                    style='
                                            padding: 20px;
                                            border-radius: 3px;
                                            border: 2px solid #c2c0c029;
                                        '
                  >
                    <table style='width: 100%'>

                      <tr>
                        <td>
                          <div class='header'>
                            <h1>
                               Verification
                            </h1>
                          </div>
                          <div class='main'>
                            <p>Dear ${user_name} </p> 
                            <p>
                              You will need to enter this passcode to complete
                              the login process
                              <b> ${verification_code} </b> 

                            </p>
                            
                          </div>
                        </td>
                      </tr>
                      <tr height='50'></tr>
                    </table>
                  </td>
                </tr>
                <tr height='50'></tr>

              </thead>
            </table>
          </center>
        </td>
      </tr>
    </table>
  </body>

</html>
`
}
