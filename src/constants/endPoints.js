export const API_ENDPOINTS = {
    // auth
    signup: '/users/register',
    send_resetOtp: '/users/forgotpasword',
    verify_resetOtp: '/users/verifyotp',
    resetPassword: '/users/reset-password',
    countries: '/users/countries',
    professions: '/users/professions',
    profile_get: "/profile",
    profile_update: "/profile",
    plans: "/plan",
    products: "/products",
    categories:"/products/categories",
    categoriesPlanwise:"/products/categories-plan-wise",
    productsCategoryPlanwise:"/products/products-plan-category-wise",
    categorywise:"/products/categorywise",
    categorywise2:"/products/categorywise2",

    openProduct:"/products/open",
    previewProduct:"/products/preview",

    searchHome:"/products/searchHome",



    planwise:"/products/planwise",
    referralTree: "/profile/referral-tree",
    referralList: "/profile/referral-list",
    paymentMethods: '/payment/methods',

    //categories: "/categories",
    instantFunding: "/plan?id=&tableName=instant_funding_plans",
    twoPhase: "/plan?id=&tableName=two_phases_plans",
    addOns: "/payment/add-ons",
    checkout: "/payment/create-checkout-session",
    updateStatus: "/payment/update-stripe-session-status",
    transactions:'/transactions',
    faq:'/content/faq',

    couponCode: "/payment/apply-coupon-code",
    getProfile: "/profile",
    updateProfile: "/profile",
    changePassowrd: "/profile/change-password",
    dashboard: "/profile/dashboard",

    forgotPassword: "/forgot-password",
    verifyEmail: "/verify-email",
    currencies: "/payment/crypto-currencies?status=active",


        scrDetails:"/scr/",
    referralRules:"/scr/referral-rules",
}