const manifest = {
    "manifest_version": 2,
    "version": "1.0.0",
    "name": "RFC Reader",
    "author": "Petr Flaks",
    "homepage_url": "https://github.com/neluzhin/rfc-reader",
    "description": "Simple extension that makes IEFT's RFCs more eye friendly.",
    "short_name": "RFC Reader",
    "offline_enabled": true,

    "permissions": [
        "http://tools.ietf.org/*",
        "https://tools.ietf.org/*"
    ],

    "icons": {
        "96": "/logo.png"
    },

    "content_scripts": [{
        "matches": [
            "http://tools.ietf.org/html/*",
            "https://tools.ietf.org/html/*"
        ],
        "js": [
            "/src/content-script.js"
        ]
    }]
};

export default manifest;
