const sgMail =  require ('@sendgrid/mail')
const { text } = require('express')
sgMail.setApiKey('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')

function sendEmailConfirmationHTML(){
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
    <div class = "container section">
     <label>PRODUCTOS</label>
     <img src = "https://www.buscador.com/wp-content/uploads/2020/02/producto2.jpg">
</body>
</html>`
}

function getMessage(emailParams){
  return{
    from:'valentina.alvarezi@autonoma.edu.co',
    to: 'valentina.alvarezi@autonoma.edu.co',
    subject:'Confirmation orden de compra blac Friday',
    text: `Hola ${emailParams.customerName}, te enviamos imagenes de los productos compramos
    y la factura con numero ${emailParams.orderNro}. Gracias por tu compra`,
    html:sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
  }
}

async function sendOrder(emailParams){
  try{
    await sgMail.send(getMessage(emailParams))
    return {message:'confirmación de compra enviada'}

  }catch(err){
    const message='no se pudo enviar la orden de compra. Valide los errores'
    console.error(message)
    console.error(err)
    if(err.response)console.error(err.response.body)
    return{message}
  }
}

module.exports={
  sendOrder
}