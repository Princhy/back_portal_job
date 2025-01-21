const ensureAuthentificated = require("../middlewares/Auth");
const router = require("express").Router();

const {
    store,
    update,
    getJob,
    getJobById,
    deleteJob,
  } = require("../controllers/jobController");
  const {
    storeValidation,  
    updateValidation, 
  } = require("../middlewares/JobValidation");

  router.post(
    "/storejob",
    //ensureAuthentificated,
    storeValidation,     
    store
  );

  router.put(
    "/updatejob/:id",
    //ensureAuthentificated,
    updateValidation,
    update,
  );

  router.get(
    "/getjob",
    //ensureAuthentificated,
    getJob,
  );

  router.get(
    "/getjobbyid/:id",
    //ensureAuthentificated,
    getJobById,
  );

  router.delete(
    "/deletejob/:id",
    //ensureAuthentificated,
    deleteJob,
  );



  module.exports = router;