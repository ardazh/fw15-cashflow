/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('../../public/bg-login.svg')",
        index: "url('../../public/index-banner.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
        {
            defaultTheme: {
                'primary': '#E14D2A',
                'secondary': '#FD841F',
                'info': '#E5E7EB'
            }
        }
    ]
},
  plugins: [
    require('daisyui')
  ],
}
