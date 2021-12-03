module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        // Accept mocha key words
        mocha: true
    },
    extends: [
    // Enable only ticked errors in the eslint site/rules
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    settings: {
        react: {
            version: '17.0.2'
        }
    },
    plugins: ['react', 'react-hooks'],
    rules: {
    // Need space before blocks
        'space-before-blocks': 'error',
        // Need spaces between curley
        'object-curly-spacing': ['error', 'always'],
        // Enforce to use curly brackets for scopes
        curly: 'error',
        // Do not allow var declarations
        'no-var': 'error',
        // Not allow more than one line brek
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        // No nested ternary
        'no-nested-ternary': 'error',
        // Only allow single quotes
        quotes: ['error', 'single'],
        // Only single quotes allowed inside jsx
        'jsx-quotes': ['error', 'prefer-single'],
        // Remove adding trailing comma
        'comma-dangle': ['error', 'never'],
        // Return statement with if & else
        'no-else-return': 'error',
        // Do not accept alert
        'no-alert': 'error',
        // Null comparison
        'no-eq-null': 'error',
        // Disallow unnecessary labels defined
        'no-extra-label': 'error',
        // Enforce to have a space after the comment sign
        'spaced-comment': 'error',
        // Space arround infix operators
        'space-infix-ops': 'error',
        // Disallow invalid this
        'no-invalid-this': 'error',
        // No __iterator__
        'no-iterator': 'error',
        // No multiple spaces in a row
        'no-multi-spaces': 'error',
        // Disallow Function constructor
        'no-new-func': 'error',
        // Don't assign function parameters
        'no-param-reassign': 'error',
        // Don't use __proto__
        'no-proto': 'error',
        // Don't assign to a variable while returning
        'no-return-assign': 'error',
        // Don't return await statement
        'no-return-await': 'error',
        // Disallow unmodified conditions of loops
        'no-unmodified-loop-condition': 'error',
        // No unused expressions
        'no-unused-expressions': 'error',
        // Use Error object when rejecting promises
        'prefer-promise-reject-errors': 'error',
        // Keep spaces around array brackets
        'array-bracket-spacing': 'error',
        // Keep spaces among block parantheses
        'block-spacing': 'error',
        // Enforce camelcase style
        camelcase: 'error',
        // Enforce first letter capitalize comments
        'capitalized-comments': 'error',
        // Keep space after the comma
        'comma-spacing': 'error',
        // Keep new line at EOF
        'eol-last': 'error',
        // Do not keep space between function name and the parantheses when calling a function
        'func-call-spacing': 'error',
        // Enforce to use function expression
        'func-style': 'error',
        // Do not allow line breaks between arfuments of a function call
        'function-call-argument-newline': ['error', 'never'],
        // Enforce the location of arrow function bodies with implicit returns
        'implicit-arrow-linebreak': 'error',
        // Enforce consistent spacing between keys and values in object literal properties
        'key-spacing': 'error',
        // Enforce consistent spacing before and after keywords
        'keyword-spacing': 'error',
        // Enforce position of line comments
        'line-comment-position': ['error', { position: 'above' }],
        // Require an empty line between class members
        'lines-between-class-members': ['error', 'always'],
        // Enforce a maximum line length : 120
        'max-len': [
            'error',
            { code: 120, ignorePattern: '^import [^,]+ from |^export | implements ' }
        ],
        // Enforce a maximum file length 300
        'max-lines': 'error',
        // Enforce a particular style for multiline comments
        'multiline-comment-style': ['error', 'starred-block'],
        // Can not ommision of paranthese when create object
        'new-parens': 'error',
        // Disallow whitespace before properties
        'no-whitespace-before-property': 'error',
        // Use four spaces
        indent: ['error', 4, { SwitchCase: 1 }],
        // Need semicolon
        semi: ['error', 'always'],
        // Space before function name
        'space-before-function-paren': ['error', 'always'],
        eqeqeq: 'error'
    },
    globals: {
        mocha: true,
        sinon: true,
        chai: true
    }
};
