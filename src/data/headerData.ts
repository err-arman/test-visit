type GuestHeaderLink = {
    link: string,
    label: string,
    type: "link" | "button",
    varient?: "primary" | "secondary"
}

export const guestHeaderLinks: GuestHeaderLink[] = [
    {
        "link": "/about",
        "label": "Features",
        "type": "link"
    },
    {
        "link": "/auth/login",
        "label": "Sign in",
        "type": "link"
    },
    {
        "link": "/auth/register",
        "label": "Sign up",
        "type": "button",
        "varient": "secondary"
    },
    {
        "link": "#",
        "label": "Sign up as provider",
        "type": "button",
        "varient": "primary"
    },
]


type UserHeaderLink = {
    link: string,
    label: string,
    type: "link" | "button",
    varient?: "primary" | "secondary"
}

export const userHeaderLinks: UserHeaderLink[] = [
    // {
    //     "link": "/locations/all-locations",
    //     "label": "Locations",
    //     "type": "link"
    // },
    {
        "link": "/",
        "label": "Get Care",
        "type": "link"
    },
    {
        "link": "/visits/all-visits",
        "label": "Visits",
        "type": "link"
    },
    {
        "link": "/insurance",
        "label": "insurance",
        "type": "link"
    },{
        "link": "/profile/edit-profile",
        "label": "Profile",
        "type": "link"
    },
]