const nodemailer = require('nodemailer');
const Contat = require("../models/Contats");

// DEBES RELLENAR ESTAS CONSTANTES ["USEREMAIL" y "USERPASS"] CON UN CORREO Y CONTRASENA, 
// DICHO CORREO NO DEBE TENER ACTIVADO LA  SEGURIDAD EN DOS PASOS 
// Y DEBE TERNER ACTIVO EL ACCESO  A SITIOS NOMUY SEGUROS

const USEREMAIL = "";
const USERPASS = "";

// FIN  "Eso era  todo jajajaj"

let IsError = false;
let MsgError = "";

module.exports.GetLogin = (req, res, next) => {
    res.render("login.hbs");
}

module.exports.PostLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (email == "202010421@itla.edu.do" && password == "202010421") {
        res.redirect("/home");
    } else {
        res.render("login.hbs", { alertDanger: true, alertDangerMessage: "Email or password is incorrect" });
    }
}

module.exports.GetHome = async(req, res, next) => {
    const contacts = (await Contat.findAll()).map(item => item.dataValues);
    console.log(contacts);
    res.render("home.hbs", {
        contacts,
        IsError,
        MsgError
    });
}


//COntancst
module.exports.GetHomeEdit = async(req, res, next) => {
    const { id } = req.params;

    const contacts = (await Contat.findAll()).map(item => item.dataValues);
    const editContact = await Contat.findByPk(id);
    console.log(editContact.dataValues);

    if (editContact) {
        res.render("home.hbs", { editMode: true, editContact: editContact.dataValues, contacts });
    } else {
        res.send("Server error");
    }

}
module.exports.addContact = (req, res, next) => {
    const { FirstName, LastName, Email, Mobil } = req.body;
    try {
        if (req.body) {
            const contac = Contat.create(req.body);
            console.log(contac);
            if (contac) {
                res.redirect("/home");
            } else {}
        } else {
            res.send("server error");
        }
    } catch (error) {
        console.log(error)
        res.send("server error");
    }

}
module.exports.editContact = async(req, res, next) => {

    if (req.body) {
        const contact = await Contat.update({...req.body }, { where: { Id: req.body.Id } });
        res.redirect("/home");
    }

}
module.exports.deleteContact = async(req, res, next) => {
    const { id } = req.params;

    // const contact = await Contat.findByPk(id);
    // console.log(contact);

    const ress = await Contat.destroy({ where: { Id: id } });
    console.log(ress);

    if (ress) {
        res.redirect("/home");
    } else {
        res.send("Server error");
    }

}

//SECCION DEL ENVIO DE CORREO
module.exports.GetPageSendEmail = async(req, res, next) => {
    const { email } = req.params;
    res.render("SendEmail.hbs", { email });
}
module.exports.SendEmail = async(req, res, next) => {
    const { Para, Asundo, cuerpo } = req.body;

    // email sender function
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: USEREMAIL,
            pass: USERPASSUSERPASS
        }
    });

    // Definimos el email
    var mailOptions = {
        from: USEREMAIL,
        to: Para,
        subject: Asundo,
        text: cuerpo
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            IsError = true;
            MsgError = "Ha ocorrudo un error al enviar el email verifique el correro o destino y vuelva a intentarlo";

            res.redirect("/home");
        } else {
            console.log("Email sent");
            res.redirect("/home");
        }
    });

}