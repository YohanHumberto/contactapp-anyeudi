const router = require("express").Router();
const controller = require("../controllers/controller");


router.get("/", controller.GetLogin);
router.post("/", controller.PostLogin);
router.get("/home", controller.GetHome);

//Contacts

router.get("/GetHomeEdit/:id", controller.GetHomeEdit);
router.post("/addContact", controller.addContact);
router.post("/editContact", controller.editContact);
router.get("/deleteContact/:id", controller.deleteContact);




module.exports = router;

