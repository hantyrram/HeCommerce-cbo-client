//api endpoint definitions



export default {
   AUTH$LOGIN_EXEC: 'post:/cbo/apiv1/auth/login',
   AUTH$LOGOUT_EXEC: 'post:/cbo/apiv1/auth/logout',
   AUTH$AUTHENTICATE_EXEC: 'post:/cbo/apiv1/auth/authenticate',
   API_LIST: `get:/cbo/apiv1/apis`,
   EMPLOYEE_LIST: 'get:/cbo/apiv1/employees',
   // EMPLOYEE_ADD: 'post:/cbo/apiv1/employees/empid_manual',
   EMPLOYEE_ADD: 'post:/cbo/apiv1/employees',
   EMPLOYEE_EDIT: 'patch:/cbo/apiv1/employees/:_id',
   EMPLOYEE$PHOTO_EDIT: 'post:/cbo/apiv1/employees/:_id/photo',
   EMPLOYEE$PHOTO_READ: 'get:/cbo/apiv1/employees/:_id/photo',
   EMPLOYEE_READ: 'get:/cbo/apiv1/employees/:_id',
   EMPLOYEE_VERIFY: 'post:/cbo/apiv1/employees/verify',
   USERACCOUNT_LIST: 'get:/cbo/apiv1/useraccounts',
   USERACCOUNT_READ: 'get:/cbo/apiv1/useraccounts/:useraccountId',
   USERACCOUNT$CREDENTIAL_CREATE: 'post:/cbo/apiv1/useraccounts/credential',
   USERACCOUNT$CREDENTIAL$GENERATE_EXEC: 'post:/cbo/apiv1/useraccounts/credential/generate',
   USERACCOUNT$ROLES_LIST: 'get:/cbo/apiv1/useraccounts/:useraccountId/roles',
   USERACCOUNT$ROLES_ADD:'put:/cbo/apiv1/useraccounts/:username/:ownerType/roles',
   USERACCOUNT$ROLES_DELETE: 'delete:/cbo/apiv1/useraccounts/:username/roles/:roleId',
   PERMISSION_LIST: 'get:/cbo/apiv1/permissions',   
   PRODUCT_LIST: 'get:/cbo/apiv1/products',
   PRODUCT_ADD: 'post:/cbo/apiv1/products',
   PRODUCT_READ: 'get:/cbo/apiv1/products/:productId',
   PRODUCT_DELETE: 'delete:/cbo/apiv1/products/:productId',
   PRODUCT_UPDATE: 'patch:/cbo/apiv1/products/:productId',
   PRODUCT$CATEGORY_EDIT: 'patch:/cbo/apiv1/products/:product_id/category',
   PRODUCT$IMAGES_ADD: 'post:/cbo/apiv1/products/:_id/images',
   PRODUCT$IMAGES_DELETE: 'delete:/cbo/apiv1/products/:product_id/images/:_id',
   PRODUCTCATEGORY_LIST: 'get:/cbo/apiv1/productcategories',
   PRODUCTCATEGORY_CREATE: 'post:/cbo/apiv1/productcategories',
   PRODUCTCATEGORY_DELETE: 'delete:/cbo/apiv1/productcategories/:productcategoryId',
   PRODUCTATTRIBUTE_LIST: 'get:/cbo/apiv1/productattributes',
   PRODUCTATTRIBUTE_CREATE: 'post:/cbo/apiv1/productattributes',
   PRODUCTATTRIBUTE_UPDATE: 'patch:/cbo/apiv1/productattributes/:productattributeId',
   PRODUCTATTRIBUTE$TERMS_ADD: 'patch:/cbo/apiv1/productattributes/:productattributeId/terms/add',
   PRODUCTATTRIBUTE$TERMS_REMOVE: 'patch:/cbo/apiv1/productattributes/:productattributeId/terms/remove',
   ROLE_LIST:'get:/cbo/apiv1/roles',
   ROLE_CREATE:'post:/cbo/apiv1/roles',
   ROLE_READ:'get:/cbo/apiv1/roles/:roleId',
   ROLE_DELETE:'delete:/cbo/apiv1/roles/:roleId',
   ROLE_EDIT:'patch:/cbo/apiv1/roles/:roleId',
   ROLE$PERMISSIONS_LIST: 'get:/cbo/apiv1/roles/:roleId/permissions',
   ROLE$PERMISSIONS_EDIT:'patch:/cbo/apiv1/roles/:roleId/permissions', //actually handled by role edit
   ROLE$PERMISSIONS_REMOVE:'patch:/cbo/apiv1/roles/:roleId/permissions/remove',//actually handled by role edit,no use for now
   UTIL$EXTDATA$COUNTRY_LIST:'get:/cbo/apiv1/util/extdata/countries',
   UTIL$EXTDATA$COUNTRYSTATE_LIST:'get:/cbo/apiv1/util/extdata/states/:country?',
   UTIL$EXTDATA$COUNTRYCITY_LIST:'get:/cbo/apiv1/util/extdata/cities/:state',
   UTIL$EXTDATA$PSGC_READ: 'get:/cbo/apiv1/util/extdata/psgc/:geolevel?',
   // SETTING_READ: 'get:/cbo/apiv1/settings',
   // SETTING$SHIPPINGZONE_ADD:'post:/cbo/apiv1/settings/shippingzone',
   // SETTING$SHIPPINGZONE_READ: 'get:/cbo/apiv1/settings/shippingzone',
   STORESETTING_LIST: 'get:/cbo/apiv1/storesettings',
   STORESETTING$BASIC_EDIT: 'patch:/cbo/apiv1/storesettings/:settingname',
   STORESETTING$SHIPPING$SHIPPINGZONE_LIST: 'get:/cbo/apiv1/storesettings/shipping/shippingzones',
   STORESETTING$SHIPPING$SHIPPINGZONE_ADD: 'post:/cbo/apiv1/storesettings/shipping/shippingzones',
   STORESETTING$SHIPPING$SHIPPINGZONE_EDIT: 'put:/cbo/apiv1/storesettings/shipping/shippingzones/:shippingZoneId',
   STORESETTING$SHIPPING$SHIPPINGZONE_DELETE: 'delete:/cbo/apiv1/storesettings/shipping/shippingzones/:_id',
   STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_ADD: 'patch:/cbo/apiv1/storesettings/shipping/shippingzones/:shippingZoneId/shippingmethods',
   STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_DELETE: 'delete:/cbo/apiv1/storesettings/shipping/shippingzones/:shippingZoneId/shippingmethods/:_name',
   STORESETTING$SHIPPING$SHIPPINGORIGIN_EDIT: 'patch:/cbo/apiv1/storesettings/shipping/shippingorigin',
   SETTING$STORE$GENERAL_EDIT: 'patch:/cbo/apiv1/settings/store/general',
   SEARCH_EXEC: 'get:/cbo/apiv1/search'
   //search?resource=product,key=slug,slug=abc,limit=1
}
