module.exports = {
    content: [
        './src/Admin/components/Sidebar/**/*.{js,jsx,ts,tsx}', // Tùy vào cấu trúc dự án của bạn
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
};