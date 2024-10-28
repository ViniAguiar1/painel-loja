const menuItems = [
    {
        label: "Navigation", type: "HEADER", //  HEADER , HASHMENU, ITEM(default)
    },
    {
        type: "HASHMENU", id: 1, label: "Dashboard", icon: "ph-duotone ph-gauge", badge: "2", dataPage: null,
        submenu: [
            { id: "dashboard", label: "Analytics", link: "/", dataPage: "dashboard" },
        ]
    },

        // Pages
        { label: "Pages", type: "HEADER", },
        {
            type: "HASHMENU", id: "authentication", label: "Authentication", dataPage: null, icon: "ph-duotone ph-shield-checkered", link: "#",
            submenu: [
                {
                    type: "HASHMENU", id: "auth1", label: "Authentication 1", dataPage: null, link: "#",
                    submenu: [
                        { id: "login", label: "Login", link: "/login", dataPage: "pages-login" },
                        { id: "register", label: "Register", link: "/register", dataPage: "pages-register" },
                        { id: "forgotpw", label: "Forgot Password", link: "/forgot-password", dataPage: "pages-forgot-password" },
                        { id: "resetpw", label: "Reset Password", link: "/reset-password", dataPage: "pages-reset-password" },
                        { id: "codeverify", label: "Code Verification", link: "/code-verification", dataPage: "code-verification" }
                    ]
                },
            ]
        },
        {
            type: "HASHMENU", id: "maintenance", label: "Maintenance", dataPage: null, icon: "ph-duotone ph-wrench", link: "#",
            submenu: [
                { id: "er404", label: "Error 404", link: "/error-404", dataPage: "error-404" },
                { id: "connectionlost", label: "Connection lost", link: "/connection-lost", dataPage: "connection-lost" },
                { id: "underconstruction", label: "Under Construction", link: "/under-construction", dataPage: "under-construction" },
                { id: "comingsoon", label: "Coming soon", link: "/coming-soon", dataPage: "coming-soon" }
            ]
        },
       
    // Other
    { label: "Other", type: "HEADER" },
    {
        type: "HASHMENU", id: "menulevels", label: "Menu levels", dataPage: null, icon: "ph-duotone ph-tree-structure", link: "#",
        submenu: [
            { id: "level2.1", label: "Level 2.1", dataPage: null, link: "#" },
            {
                type: "HASHMENU", id: "Level 2.2", label: "Level 2.2", dataPage: null, link: "#",
                submenu: [
                    { id: "level3.1", label: "Level 3.1", link: "#", dataPage: "#3.1" },
                    { id: "level3.2", label: "Level 3.2", link: "#", dataPage: "#3.2" },
                    {
                        type: "HASHMENU", id: "level3.3", label: "Level 3.3", dataPage: null, link: "#",
                        submenu: [
                            { id: "level4.1", label: "Level 4.1", link: "#", dataPage: "#4.1" },
                            { id: "level4.2", label: "Level 4.2", link: "#", dataPage: "#4.2" }
                        ]
                    }
                ]
            },
            {
                type: "HASHMENU", id: "level2.3", label: "Level 2.3", dataPage: null, link: "#",
                submenu: [
                    { id: "level3.1", label: "Level 3.1", link: "#", dataPage: "#3.1" },
                    { id: "level3.2", label: "Level 3.2", link: "#", dataPage: "#3.2" },
                    {
                        type: "HASHMENU", id: "level3.3", label: "Level 3.3", dataPage: null, link: "#",
                        submenu: [
                            { id: "level4.1", label: "Level 4.1", link: "#", dataPage: "#4.1" },
                            { id: "level4.2", label: "Level 4.2", link: "#", dataPage: "#4.2" }
                        ]
                    }
                ]
            }
        ]
    },
    { id: "samplepage", label: "Sample page", icon: "ph-duotone ph-desktop", link: "/sample-page", dataPage: "sample-page" }
];

export { menuItems };