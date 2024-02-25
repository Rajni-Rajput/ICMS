const express =require ('express')
const { listpolicyController, deletepolicyController, postPolicy, selectPolicy, claimPolicy, 
    userPolicyList, userClaimList, listClaimController, approveClaim, rejectClaim, addRemark } = require('../controllers/policyController')
const {generateUniqueId} = require('../middlewares/middleware');
const router =express.Router()

// router.post('/addpolicies',postPolicy)
router.post('/deletePolicies',deletepolicyController)
router.get('/listp',listpolicyController)
router.post('/selectPolicy',selectPolicy)
// router.post('/claim',claimPolicy)
router.post('/userPolicyList',userPolicyList)
router.post('/claimPolicy',claimPolicy)
router.post('/userClaimList',userClaimList)
router.get('/listc',listClaimController)
router.post('/approveClaim',approveClaim)
router.post('/rejectClaim',rejectClaim)
//router.post('/addRemark',addRemark)




module.exports = router