const path = require("path")
// configrations for layout settings

const layout_settings= {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve(__dirname + "../../../views"),
        layoutsDir: path.resolve(__dirname + "../../../views"),
        defaultLayout: 'layout.hbs',
    },
    viewPath: path.resolve(__dirname + "../../../views"),
    extName: '.hbs',
}
const formats= {
    registration : {
        subject : "New Account has been created",
        html : "registration"
    },
    forgot : {
        subject : "Recover Password",
        html : "forget"
    }
}