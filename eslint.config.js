const rules = {
    // always include parens with arrow functions
    "arrow-parens": ["error", "always"],
    // max line width
    "max-len": [
        "warn",
        {
            code: 120,
        },
    ],
    // 4 space indents
    indent: [
        "error",
        4,
        {
            SwitchCase: 1,
            MemberExpression: "off",
            flatTernaryExpressions: true,
        },
    ],
    // no unused params or variables allowed (unless you postfix with an underscore)
    "no-unused-vars": [
        "warn",
        {
            args: "all",
            // unused vars and args should end with an underscore
            argsIgnorePattern: "(^.+_$)",
            varsIgnorePattern: "(^.+_$)",
        },
    ],
    "comma-spacing": [
        "warn",
        {
            before: false,
            after: true,
        },
    ],
    // always put a comma at the end of an entry in a multi-line collection
    "comma-dangle": ["warn", "always-multiline"],
    // every file ends in a linefeed LF (`"\n"`)
    "eol-last": "error",
    // always use `===` versus `==`
    eqeqeq: "error",
    // linefeeds LF (`"\n"`) only
    "llinebreak-style": ["error", "unix"],
    radix: ["error", "as-needed"],
    semi: ["error", "always"],
};

module.exports = [
    {
        files: ["**/*.js", "**/*.cjs"],
        // ignores: ["**/eslint.config.js"],
        rules,
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
    },
    {
        files: [
            "**/*.mjs"
            // "**/eslint.config.js"
        ],
        rules,
        languageOptions: {
            sourceType: "module",
            ecmaVersion: "latest",
        },
    },
];


