/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		backgroundImage: {
		  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
		  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: '#0069ff',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		},
		keyframes: {
		  // Random float movement in different directions, with more inward movement
		  'float-1': {
			'0%, 100%': { transform: 'translate(0, 0)' },
			'25%': { transform: 'translate(30px, -30px)' },
			'50%': { transform: 'translate(-40px, 40px)' },
			'75%': { transform: 'translate(20px, 50px)' },
		  },
		  'float-2': {
			'0%, 100%': { transform: 'translate(0, 0)' },
			'25%': { transform: 'translate(-30px, 20px)' },
			'50%': { transform: 'translate(30px, -20px)' },
			'75%': { transform: 'translate(50px, 40px)' },
		  },
		  'float-3': {
			'0%, 100%': { transform: 'translate(0, 0)' },
			'25%': { transform: 'translate(-30px, 15px)' },
			'50%': { transform: 'translate(20px, -25px)' },
			'75%': { transform: 'translate(-40px, 35px)' },
		  },
		  'float-4': {
			'0%, 100%': { transform: 'translate(0, 0)' },
			'25%': { transform: 'translate(10px, 40px)' },
			'50%': { transform: 'translate(-40px, -25px)' },
			'75%': { transform: 'translate(30px, 20px)' },
		  },
		},
		animation: {
		  'float-1': 'float-1 12s ease-in-out infinite',
		  'float-2': 'float-2 12s ease-in-out infinite',
		  'float-3': 'float-3 12s ease-in-out infinite',
		  'float-4': 'float-4 12s ease-in-out infinite',
		},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  }
  